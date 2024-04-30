let fileLanguage = null;

const chargeFilePrompts = async () => {
    if (fileLanguage) return;    
    const response = await fetch('languages/languages.json');
    if (!response.ok) {
        throw new Error('The file languages.json was not found');
    }
    fileLanguage = await response.json();
};

const changeLanguage = async (language) => {
    const htmlElement = document.querySelector('html');
    htmlElement.setAttribute('lang', language);
    await chargeFilePrompts();
    
    const prompts = document.querySelectorAll("[prompt]");
    prompts.forEach(element => {
        const promptKey = element.getAttribute('prompt');
        const prompt = fileLanguage[language]?.[promptKey] || "Prompt not found, verify the language.json file";
        element.innerHTML = prompt;
    });
};

document.addEventListener('DOMContentLoaded', () => {
    const languageSelected = document.getElementById('language');
    languageSelected.addEventListener('change', () => {
        changeLanguage(languageSelected.value);
    });
    // //when initializing the page charge the prompts, does not require default values ​​from the html
    // changeLanguage(languageSelected.value);
});