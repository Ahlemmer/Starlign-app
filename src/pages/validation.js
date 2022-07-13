
const validation = (values) => {
    let errors={};



    if (!values.fullname){
        errors.fullname="name is required";
    }else if(values.fullname.length < 3){
        errors.fullname="name must be more than 3 caracters.";
    }else if(!/^[A-Za-z]+$/.test(values.fullname)){
        errors.fullname="nom invalide";
    }



    if (!values.prénom){
        errors.prénom="prénom is required";
    }else if(values.prénom.length < 3){
        errors.prénom="prénom must be more than 3 caracters.";
    }else if(!/^[A-Za-z]+$/.test(values.prénom)){
        errors.prénom="prénom invalide";
    }



    if (!values.email){
        errors.email="email is required";
    }else if (!/\S+@\S+\.\S+/.test(values.email)){
        errors.email="email is invalid.";
    }


    if (!values.password){
        errors.password="password is required";
    }else if (values.password.length < 8){
        errors.password="password must be more than 8 caracters.";
    }else if (!/^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$/.test(values.password))
    {
        errors.password="Password should  include at least 1 letter, 1 number and 1 special character(!@#$%^&*)"
    }

    
    if (!values.password2) {
        errors.password2 = 'Password is required';
    } else if (values.password2 !== values.password) {
        errors.password2 = 'Passwords do not match';
    }



    return errors;
};
export default validation;
    









