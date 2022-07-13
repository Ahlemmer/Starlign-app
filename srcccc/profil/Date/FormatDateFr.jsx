export const dateFrParser = (num) => {
    let options = {
      hour: "2-digit",
      minute: "2-digit",
      
    };
    let timestamp = Date.parse(num);
    let date = new Date(timestamp).toLocaleDateString("fr-FR", options);
    return date.toString();
  };