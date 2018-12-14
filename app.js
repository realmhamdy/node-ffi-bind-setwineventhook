const ffi = require("ffi-napi")

const user32 = ffi.Library("user32", {
    SetWinEventHook: ["int", ["int", "int", "pointer", "pointer", "int", "int", "int"]]
})

const pfnWinEventProc = ffi.Callback("void", ["pointer", "int", "pointer", "long", "long", "int", "int"],
    function (hWinEventHook, event, hwnd, idObject, idChild, idEventThread, dwmsEventTime) {
        console.log("Callback!")
        console.log(arguments)
    })

const EVENT_SYSTEM_FOREGROUND = 3
const WINEVENT_OUTOFCONTEXT = 0
const WINEVENT_SKPIOWNPROCESS = 2

user32.SetWinEventHook(EVENT_SYSTEM_FOREGROUND, EVENT_SYSTEM_FOREGROUND, null, pfnWinEventProc,
    0, 0, WINEVENT_OUTOFCONTEXT | WINEVENT_SKPIOWNPROCESS)

setInterval(function () {
    // keep the script alive
}, 500)

process.on("exit", function () {
    console.log("Exiting")
    pfnWinEventProc
})