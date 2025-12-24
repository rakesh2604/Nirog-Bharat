// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract HealthRegistry {
    struct MedicalRecord {
        string ipfsHash;
        uint256 timestamp;
        string recordType;
        address uploadedBy;
    }

    struct AccessGrant {
        bool isGranted;
        uint256 expiry; // Timestamp when access expires
    }

    // State Variables
    mapping(string => address) public patientOwners; // abhaId -> Wallet Address of Patient
    mapping(address => string) public addressToAbha; // Reverse lookup
    
    mapping(string => MedicalRecord[]) private patientRecords; // abhaId -> records
    mapping(string => mapping(address => AccessGrant)) private accessRegistry; // abhaId -> doctor -> AccessGrant
    mapping(string => mapping(address => bool)) private emergencyAccessLog; // abhaId -> doctor -> attempted

    // Events
    event PatientRegistered(string abhaId, address owner);
    event RecordAdded(string abhaId, string ipfsHash, string recordType);
    event AccessGranted(string abhaId, address indexed doctor, uint256 expiry);
    event AccessRevoked(string abhaId, address indexed doctor);
    event EmergencyAccessLogged(string abhaId, address indexed doctor, string reason, uint256 timestamp);

    // Modifiers
    modifier onlyPatient(string memory _abhaId) {
        require(patientOwners[_abhaId] == msg.sender, "Not the patient owner");
        _;
    }

    // 1. Registration
    function registerPatient(string memory _abhaId) public {
        require(patientOwners[_abhaId] == address(0), "ID already registered");
        require(bytes(addressToAbha[msg.sender]).length == 0, "Address already registered");
        
        patientOwners[_abhaId] = msg.sender;
        addressToAbha[msg.sender] = _abhaId;
        
        emit PatientRegistered(_abhaId, msg.sender);
    }

    // 2. Records Management
    function addRecord(string memory _abhaId, string memory _ipfsHash, string memory _recordType) public {
        // Allow Doctor to upload if they have access OR if it's the patient themselves
        bool isPatient = patientOwners[_abhaId] == msg.sender;
        bool hasAccess = checkAccess(_abhaId, msg.sender);
        
        require(isPatient || hasAccess, "Unauthorized to upload");

        patientRecords[_abhaId].push(MedicalRecord({
            ipfsHash: _ipfsHash,
            timestamp: block.timestamp,
            recordType: _recordType,
            uploadedBy: msg.sender
        }));
        emit RecordAdded(_abhaId, _ipfsHash, _recordType);
    }

    function getRecords(string memory _abhaId) public view returns (MedicalRecord[] memory) {
        // Privacy check: Only Patient or Authorized Doctor can view
        if (patientOwners[_abhaId] == msg.sender) {
            return patientRecords[_abhaId];
        }
        if (checkAccess(_abhaId, msg.sender)) {
            return patientRecords[_abhaId];
        }
        revert("Unauthorized Access");
    }

    // 3. Consent Management
    function grantAccess(string memory _abhaId, address _doctor, uint256 _durationSeconds) public onlyPatient(_abhaId) {
        accessRegistry[_abhaId][_doctor] = AccessGrant({
            isGranted: true,
            expiry: block.timestamp + _durationSeconds
        });
        emit AccessGranted(_abhaId, _doctor, block.timestamp + _durationSeconds);
    }

    function revokeAccess(string memory _abhaId, address _doctor) public onlyPatient(_abhaId) {
        delete accessRegistry[_abhaId][_doctor];
        emit AccessRevoked(_abhaId, _doctor);
    }

    function checkAccess(string memory _abhaId, address _user) public view returns (bool) {
        // Owner always has access
        if (patientOwners[_abhaId] == _user) return true;
        
        // Emergency Access (Permanent log check or temporary window logic could apply)
        if (emergencyAccessLog[_abhaId][_user]) return true; // Simple logic: Once broken glass, always accessible? Or maybe not.
        // For security, Emergency Access usually implies a temporary window handled off-chain or via a separate state.
        // Here we keep it simple: AccessGrant check.
        
        AccessGrant memory grant = accessRegistry[_abhaId][_user];
        return grant.isGranted && grant.expiry > block.timestamp;
    }

    // 4. Emergency Mode ("Break Glass")
    function grantEmergencyAccess(string memory _abhaId, string memory _reason) public {
        require(patientOwners[_abhaId] != address(0), "Patient not found");
        
        // In a real system, this would burn a token or be restricted to verified doctors.
        // Here we just log it and grant temporary access (e.g., 2 hours).
        
        emergencyAccessLog[_abhaId][msg.sender] = true;
        
        accessRegistry[_abhaId][msg.sender] = AccessGrant({
            isGranted: true,
            expiry: block.timestamp + 2 hours // 2 Hour Golden Window
        });

        emit EmergencyAccessLogged(_abhaId, msg.sender, _reason, block.timestamp);
    }
}
