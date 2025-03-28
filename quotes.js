function getRandomQuotes(){
    const quotes = [
        "💐Believe in yourself and all that you are.💐",
        "🌸The only way to do great work is to love what you do.🌸",
        "🪷Act as if what you do makes a difference. It does. 🪷",
        "🌷Success is not final, failure is not fatal: it is the courage🌷",
        "🥀The only way to do great work is to love what you do.🥀" ,
        "💮Be the change that you wish to see in the world.💮",
        "💐Spread love everywhere you go..💐",
        "🌻You are braver than you believe, stronger than you seem.🌻", 
        "🪷The future belongs to those who believe in the beauty of their dreams.🪷" ,
        "🌺It is never too late to be what you might have been.🌺" ,
        " 🪻The optimist sees opportunity in every difficulty.🪻" ,
        "🌻Success is walking from failure to failure with no loss of enthusiasm.🌻" ,
        "🌹The journey of a thousand miles begins with one step.🌹" 
    ]

    const index = Math.floor(Math.random() * quotes.length);
    
    return quotes[index];
}

module.exports = {getRandomQuotes}