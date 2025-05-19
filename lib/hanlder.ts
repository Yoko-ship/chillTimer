import { GoogleGenAI } from "@google/genai";
const apiKey = process.env.NEXT_PUBLIC_APIKEY
const ai = new GoogleGenAI({apiKey})

export const getRecommendations = async(timerTime:string,timerName:string) =>{
    const prompt = {
        "activity":timerName,
        "duration":timerTime
    }
    const response = await ai.models.generateContent({
        model:"gemini-2.0-flash",
        contents:`
        Ты — мой AI-ассистент ChillBot. Я сейчас занимаюсь ${prompt.activity}, ${prompt.duration} времени буду это делать.
         На основе этого подбери:
Подходящую музыку (жанр или конкретный плейлист),

Лёгкий перекус или напиток, чтобы зарядиться,
Одну короткую мотивационную фразу (дружелюбную, как будто говорит друг).

Формат ответа:
music: provide a direct Youtube link.Only Link.Please give latest musics
food:
motivation:Молодежный стиль,со кринжом.
    Верни в виде object
        `
    })
    const responseText = response.text?.replaceAll("*","")
    let cleanedText = responseText!.replace(/^```(?:json)?/g, '').trimStart();
    cleanedText = cleanedText.replace(/\s*```\s*$/g,"").trimEnd();
    try{
        const object = JSON.parse(cleanedText)
        return object
    }catch(err){
        return {error:"Произошла ошибка с рекомендациями.Пожлуста попробуйте ещё раз."}
    }
}
