import React, { useEffect } from 'react';

const GoogleTranslate = () => {
  useEffect(() => {
    // Load the Google Translate script
    const googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement({
        pageLanguage: 'en', // or any default language
        
      }, 'google_translate_element');
    };

    const script = document.createElement('script');
    script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);

    window.googleTranslateElementInit = googleTranslateElementInit;
    
  }, []);

  return <div id="google_translate_element"></div>;
};

export default GoogleTranslate;
