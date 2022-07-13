const validation = (values) => {
    let errors={};

    if (!values.nom){
        errors.nom="Le nom est requis";
    }else if(values.nom.length < 3){
        errors.nom="Le nom doit comporter plus de 3 caractères";
    }else if(!/^[A-Za-z]+$/.test(values.nom)){
        errors.nom="Nom invalide";
    }
    
    if (!values.pseudo){
        errors.pseudo="Le pseudo est requis";
    }else if(values.pseudo.length < 3){
        errors.pseudo="Le pseudo doit comporter plus de 3 caractères";
    }else if(!/^[A-Za-z]+$/.test(values.pseudo)){
        errors.pseudo="Pseudo invalide";
    }



    if (!values.prenom){
        errors.prenom="Le prénom est requis";
    }else if(values.prenom.length < 3){
        errors.prenom="Le prénom doit comporter plus de 3 caractères";
    }else if(!/^[A-Za-z]+$/.test(values.prenom)){
        errors.prenom="Prénom invalide";
    }

    

    return errors;
};
export default validation;
    




