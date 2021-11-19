import Handler from "./src/index.js"

const h = new Handler("ODg2MDQ2MDMyNjE2NjI0MTM4.YTv4rA.Dj5nNc3Cyovok64WnzQuu9a4aUA")

h.on("ready", async () => {
    console.log("ready")
    
    console.log(h.utils.separateCommand(h.app.commands[0]))
})