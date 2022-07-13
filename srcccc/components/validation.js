
const validation = (values) => {
    let errors={};



    if (!values.fullname){
        errors.fullname="Nom requis";
    }else if(values.fullname.length < 3){
        errors.fullname="Le nom doit comporter plus de 3 caractères";
    }else if(!/^[A-Za-z]+$/.test(values.fullname)){
        errors.fullname="Nom invalide";
    }

    
    if (!values.pseudo){
        errors.pseudo="Pseudo requis";
    }else if(values.pseudo.length < 3){
        errors.pseudo="Le pseudo doit comporter plus de 3 caractères.";
    }else if(!/^[A-Za-z]+$/.test(values.pseudo)){
        errors.pseudo="Pseudo invalide";
    }



    if (!values.prénom){
        errors.prénom="Prénom requis";
    }else if(values.prénom.length < 3){
        errors.prénom="le prénom doit comporter plus de 3 caractères";
    }else if(!/^[A-Za-z]+$/.test(values.prénom)){
        errors.prénom="Prénom invalide";
    }



    if (!values.email){
        errors.email="Email requis";
    }else if (!/\S+@\S+\.\S+/.test(values.email)){
        errors.email="Email invalide";
    }


    if (!values.password){
        errors.password="Mot de passe requis";
    }else if (values.password.length < 8){
        errors.password="Le mot de passe doit comporter plus de 8 caractères";
    }else if (!/^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$/.test(values.password))
    {
        errors.password="Le mot de passe doit inclure au moins 1 lettre, 1 chiffre et 1 caractère spécial"
    }

    
    if (!values.password2) {
        errors.password2 = 'Mot de passe requis';
    } else if (values.password2 !== values.password) {
        errors.password2 = 'Les mots de passe sont incompatibles';
    }


    if (!values.code){
        errors.code="Le code est requis";
    }else if (values.code.length < 8){
        errors.code="le mot de passe doit comporter plus de 8 caractères";
    }else if (!/^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$/.test(values.code))
    {
        errors.code="Le mot de passe doit inclure au moins 1 lettre, 1 chiffre et 1 caractère spécial (!@#$%^&*)"
    }


    return errors;
};
export default validation;
    









