export const required = (val: any) => val ? true : false;
export const maxLength = (len: number) => (val: string) => !(val) || (val.length <= len);
export const minLength = (len: number) => (val: string) => val && (val.length >= len);
export const isNumber = (val: any) => !isNaN(Number(val));
export const validEmail = (val: string) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

export function isValidUsername(username:string) {
    const pattern = /^[a-zA-Z0-9_.]+$/;
    return pattern.test(username);
  }


export function isValidFloat(input:string) {
    // Regular expression to match a float number
    const floatRegex = /^[-+]?(\d*\.\d+|\d+\.?)([eE][-+]?\d+)?$/;
  
    // Test the input against the regular expression
    return floatRegex.test(input);
  }

export function validatePhoneNumber(input_str: string) {

    var re = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
    re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im

    return re.test(input_str);
}

//for international numbers
export function isValidPhoneNo(phoneNumber:string) {
    // Define the regex pattern
    const phoneRegex = /^\+(?:[0-9] ?){6,14}[0-9]$/;

    const isValid = phoneRegex.test(phoneNumber);
  
    return isValid;
  }

export function numberWithCommas(num: string | number) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
export function validateName(name: string) {
    // Regular expression pattern for validating the first name (allows only alphabetic characters)
    var namePattern = /^[A-Za-z]+$/;


    // Check if the first name matches the name pattern
    if (namePattern.test(name)) {
        return true; // First name is valid
    } else {
        return false; // First name contains invalid characters
    }

}
