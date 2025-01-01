export const checkSneakerName = (name: string, setErrorMsg: (msg: string) => void, setIsError: (isError: boolean) => void): boolean => {
    if (!name) {
        setErrorMsg('Please enter a sneaker name.');
        setIsError(true);
        return false;
    }
    
    const nameRegex = /^[a-zA-Z0-9\s-]+$/;
    if (!nameRegex.test(name)) {
        setErrorMsg('Name invalid, name must contain only letters, numbers and dashes.');
        setIsError(true);
        return false;
    }
    
    setErrorMsg('');
    setIsError(false);
    return true;
};

export const checkSneakerBrand = (brand: string, setErrorMsg: (msg: string) => void, setIsError: (isError: boolean) => void): boolean => {
    if (!brand) {
        setErrorMsg('Please select a brand.');
        setIsError(true);
        return false;
    }
    
    if (brand === 'Other') {
        const brandRegex = /^[a-zA-Z\s]+$/;
        if (!brandRegex.test(brand)) {
            setErrorMsg('Brand invalid, brand must contain only letters and spaces.');
            setIsError(true);
            return false;
        }
    }
    
    setErrorMsg('');
    setIsError(false);
    return true;
};

export const checkSneakerSize = (size: string, setErrorMsg: (msg: string) => void, setIsError: (isError: boolean) => void): boolean => {
    if (!size) {
        setErrorMsg('Please enter a size.');
        setIsError(true);
        return false;
    }

    const sizeNum = parseFloat(size);
    if (isNaN(sizeNum) || sizeNum < 7 || sizeNum > 16) {
        setErrorMsg('Size invalid, size must be between 7 and 16.');
        setIsError(true);
        return false;
    }

    if (!Number.isInteger(sizeNum * 2)) {
        setErrorMsg('Size invalid, size must be a multiple of 0.5.');
        setIsError(true);
        return false;
    }

    setErrorMsg('');
    setIsError(false);
    return true;
};

export const checkSneakerCondition = (condition: string, setErrorMsg: (msg: string) => void, setIsError: (isError: boolean) => void): boolean => {
    if (!condition) {
        setErrorMsg('Please enter a condition.');
        setIsError(true);
        return false;
    }

    const conditionNum = parseInt(condition);
    if (isNaN(conditionNum) || conditionNum < 0 || conditionNum > 10) {
        setErrorMsg('Condition invalid, condition must be between 0 and 10.');
        setIsError(true);
        return false;
    }

    setErrorMsg('');
    setIsError(false);
    return true;
};

export const checkSneakerStatus = (status: string, setErrorMsg: (msg: string) => void, setIsError: (isError: boolean) => void): boolean => {
    const validStatuses = ['rocking', 'stocking', 'selling', 'other'];
    
    if (!status) {
        setErrorMsg('Status invalid, status must be one of the following: rocking, stocking, selling, other.');
        setIsError(true);
        return false;
    }

    if (status === 'other') {
        const statusRegex = /^[a-zA-Z\s]+$/;
        if (!statusRegex.test(status)) {
            setErrorMsg('Status invalid, status must contain only letters.');
            setIsError(true);
            return false;
        }
    } else if (!validStatuses.includes(status.toLowerCase())) {
        setErrorMsg('Status invalid, status must be one of the following: rocking, stocking, selling, other.');
        setIsError(true);
        return false;
    }

    setErrorMsg('');
    setIsError(false);
    return true;
};

export const checkSneakerImage = (image: string, setErrorMsg: (msg: string) => void, setIsError: (isError: boolean) => void): boolean => {
    if (!image) {
        setErrorMsg('Please select an image.');
        setIsError(true);
        return false;
    }
    return true;
};

export const checkPricePaid = (pricePaid: string, setErrorMsg: (msg: string) => void, setIsError: (isError: boolean) => void): boolean => {
    if (!pricePaid) {
        setErrorMsg('Please enter a price paid.');
        setIsError(true);
        return false;
    } else if (isNaN(parseFloat(pricePaid)) || parseFloat(pricePaid) < 0) {
        setErrorMsg('Price paid invalid, price paid must be a positive number.');
        setIsError(true);
        return false;
    }
    return true;
};

export const validateAllFields = (sneakerName: string, sneakerBrand: string, sneakerSize: string, sneakerCondition: string, sneakerStatus: string, setErrorMsg: (msg: string) => void, setIsSneakerNameError: (isError: boolean) => void, setIsSneakerBrandError: (isError: boolean) => void, setIsSneakerSizeError: (isError: boolean) => void, setIsSneakerConditionError: (isError: boolean) => void, setIsSneakerStatusError: (isError: boolean) => void) => {
    const isNameValid = checkSneakerName(sneakerName, setErrorMsg, setIsSneakerNameError);
    const isBrandValid = checkSneakerBrand(sneakerBrand, setErrorMsg, setIsSneakerBrandError);
    const isSizeValid = checkSneakerSize(sneakerSize, setErrorMsg, setIsSneakerSizeError);
    const isConditionValid = checkSneakerCondition(sneakerCondition, setErrorMsg, setIsSneakerConditionError);
    const isStatusValid = checkSneakerStatus(sneakerStatus, setErrorMsg, setIsSneakerStatusError);

    return isNameValid && isBrandValid && isSizeValid && isConditionValid && isStatusValid;
};