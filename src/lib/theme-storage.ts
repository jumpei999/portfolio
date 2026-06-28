export const THEME_STORAGE_KEY = "portfolio-theme"

export const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");var r=document.documentElement;if(t==="light"){r.classList.add("light");r.style.colorScheme="light";}else if(t==="dark"){r.classList.add("dark");r.style.colorScheme="dark";}}catch(e){}})();`
