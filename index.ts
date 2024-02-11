import figlet from "figlet";

const server = Bun.serve({
    port: 3000,
    fetch(req) {
        const url = new URL(req.url);

        if (url.pathname === '/') {
            const body = figlet.textSync("I am learning bun");
            return new Response(body);
        }
        if (url.pathname === '/aboutMe') {
            return new Response("About me");
        }
        if (url.pathname === '/greet') {
            return new Response(Bun.file('./greet.txt'));
        }
        if (url.pathname === '/error') {
            throw new Error("Could not fetch data.");
        }
        return new Response('404!');
    },
    error(error){
        return new Response(`<pre> ${error} \n ${error.stack} </pre>`,{
            headers:{
                'Content-Type': 'text/html'
            }
        })

    },

});
console.log("on port 3000")