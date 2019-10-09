export const getSmartLockerAddress = smartLocker =>
    `${smartLocker.address.postalCode} ${smartLocker.address.street} ${
        smartLocker.address.streetNumber
    } ${smartLocker.address.city}`;

export const getSmartLockerName = smartLocker =>
    `${smartLocker.patient.firstName} ${smartLocker.patient.lastName}`;
