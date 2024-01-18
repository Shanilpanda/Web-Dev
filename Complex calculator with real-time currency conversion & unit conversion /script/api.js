const apiKey = "QbekQkEy99hHrxmoBo1skQss3pmfYDTq";
const options = {
  method: "GET",
  redirect: "follow",
  headers: { apiKey },
};

export async function request(url){
    let req,res;
    try{
        req = await fetch(url,options);
        res = await req.json();
        if(!res.ok){
            throw new Error(res.message);
        }
    }catch(error){
        throw new Error(error.message);
    }
    return res;
}