const el = document.getElementById('messages')
el.scrollTop = el.scrollHeight

// userName
let user = {
    userName:'Mike',
    userId: '1234' 
}


// chatRoom array 
let chatRooms = [
    {roomName:'Wap assignment', RoomId:'45678'},
    {roomName:'FootBall club', RoomId:'45678'},
    {roomName:'Music Lovers', RoomId:'45678'},
    {roomName:'SocketIO group', RoomId:'45679'}
]

// chat history array
let chatArray = [
    {"message" : "hello", "from" : "me"},
    {"message" : "hi", "from" : "friend"},
    {"message" : "how you doing", "from" : "me"},
    {"message" : "every thing 1k", "from" : "friend"},
    {"message" : "word", "from" : "me"},
    {"message" : "hello", "from" : "me"},
    {"message" : "hi", "from" : "friend"},
    {"message" : "how you doing", "from" : "me"},
    {"message" : "every thing 1k", "from" : "friend"},
    {"message" : "word", "from" : "me"}
]

populateProfile(user)
populateRooms(chatRooms,45678)


// populates profile 

function populateProfile(user){
    let initials = user.userName.charAt(0).toUpperCase();
    let name = user.userName;
    document.querySelector('#initial').innerText = initials;
    document.querySelector('#profileName').innerText = name;
}

//populate room 

function populateRooms(chatRooms, roomid){

chatRooms.forEach(obj => {
    if(obj.RoomId == roomid){
        let initials =  obj.roomName.charAt(0).toUpperCase();
    
        let box = `
            <div val='${obj.RoomId}' name ='${obj.roomName}' onclick='chat(this)'
            class="entry cursor-pointer transform hover:scale-105 duration-300 transition-transform bg-white mb-4 rounded p-4 flex shadow-md">
            <div class="flex-2">
                <div class="w-12 h-10 relative flex items-center justify-center">
                    <div class="flex items-center justify-center w-10 h-10 rounded-full m-auto border-2 border-white bg-yellow-500 shadow-lg">
                        <div class="text-gray-800 text-sm">
                            <h2 class="text-gray-800 ">${initials}</h2>
                        </div>                   
                     </div>
                    <span class="absolute w-4 h-4 bg-gray-400 rounded-full right-0 bottom-4 border-2 border-white"></span>
                </div>
            </div>
            <div class="flex-1 px-2">
                <div class="truncate w-32"><span class="text-gray-800 roomName">${obj.roomName}</span>
                </div>
                <div><small class="text-gray-600">Test message!</small></div>
            </div>
            <div class="flex-2 text-right">
                <div><small class="text-gray-500">9 Aug</small></div>
            </div>
        </div>
        `
        $('#room').append(box)
    }
   
})

}
// global array of room for searching 
let roomArray = $('#room').children();
// search on keyup
function search(e){
       if(e.value == ''){
        $('#room').append(roomArray)
       }else{
        $('#room').html('');
        roomArray.each((idx,ele) =>{
            if($(ele).attr('name').toUpperCase().startsWith(e.value.toUpperCase())){
                $('#room').append(ele)
            }
        })
       }
      
    }

    function chat(e){
       $('#chat').html('');
       $('#chat').append(makeHeader($(e).attr('name')))
       $('#messages').html('');
       populateChat(chatArray)
       $('#sendMessage').replaceWith(populateInputMessage)
    }
   
    //make the header of the chat
    function makeHeader(name){
        return `<div class="relative flex items-center space-x-4">
        <div class="w-12 h-10 relative flex items-center justify-center">
            <div class="flex items-center justify-center w-10 h-10 rounded-full m-auto border-2 border-white bg-blue-500 shadow-lg">
                <div class="text-gray-800 text-sm">
                    <h2 class="text-gray-800 ">${name.charAt(0).toUpperCase()}</h2>
                </div>                   
             </div>
            <span class="absolute w-4 h-4 bg-gray-400 rounded-full right-0 bottom-4 border-2 border-white"></span>
        </div>
        <div class="flex flex-col leading-tight">
            <div class="text-xl mt-1 flex items-center">
                <span class="text-gray-700 mr-3">${name}</span>
            </div>
        </div>
    </div>`
    }

    // to populate the chat 

    function populateChat (chatArray){
    chatArray.forEach(obj =>{
        if(obj.from == 'me'){
            let message = `<div class="chat-message">
            <div class="flex items-end justify-end">
                <div
                    class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-0 items-end">
                    <div><span
                            class="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white ">${obj.message}</span></div>
                </div>
                <div class="w-12 h-10 relative flex items-center justify-center">
                    <div class="flex items-center justify-center w-10 h-10 rounded-full m-auto border-2 border-white bg-green-500 shadow-lg">
                        <div class="text-gray-800 text-sm">
                            <h2 class="text-gray-800 ">${obj.from.charAt(0).toUpperCase()}</h2>
                        </div>                   
                     </div>
                    <span class="absolute w-4 h-4 bg-gray-400 rounded-full right-0 bottom-4 border-2 border-white"></span>
                </div>
            </div>
            
        </div>`

        $('#messages').append(message);
        }
        else{
            let message = `<div class="chat-message">
            <div class="flex items-end">
                <div
                    class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                    <div><span class="px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600">${obj.message}</span></div>
                </div>
                <div class="w-12 h-10 relative flex items-center justify-center">
                    <div class="flex items-center justify-center w-10 h-10 rounded-full m-auto border-2 border-white bg-yellow-500 shadow-lg">
                        <div class="text-gray-800 text-sm">
                            <h2 class="text-gray-800 ">${obj.from.charAt(0).toUpperCase()}</h2>
                        </div>                   
                     </div>
                    <span class="absolute w-4 h-4 bg-gray-400 rounded-full right-0 bottom-4 border-2 border-white"></span>
                </div>
            </div>
        </div>`
        $('#messages').append(message);
        }
    })
}

//populate inputMessage

function populateInputMessage(){
    let inputMessage = `<div class="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
    <div class="relative flex">
        <input type="text" placeholder="Write your message"
            class="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-5 bg-gray-200 rounded-md py-3">
        <div class="absolute right-0 items-center inset-y-0 hidden sm:flex">
            <button type="button"
                class="inline-flex items-center justify-center rounded-md rounded-l-none px-4 py-3 transition duration-500 ease-in-out text-white bg-yellow-500 hover:bg-blue-400 focus:outline-none">
                <span class="font-bold">Send</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                    fill="currentColor" class="h-6 w-6 ml-2 transform rotate-90">
                    <path
                        d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z">
                    </path>
                </svg>
            </button>
        </div>
    </div>
</div>
`
return inputMessage;
}

 