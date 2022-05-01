function Menu2() {
    this.Ask_Msg = function(){
        let msg = {
            "type": "template",
            "altText": "this is a image carousel template",
            "template": {
                "type": "image_carousel",
                "columns": [
                    {
                        "imageUrl": "https://i.imgur.com/JbOm7B3.jpeg",
                        "action": {
                            "type": "postback",
                            "label": "瞭解更多",
                            "data": 'type=1&number=1&menu=2'
                        }
                    },
                    {
                        "imageUrl": "https://i.imgur.com/bo7dGLw.jpeg",
                        "action": {
                            "type": "postback",
                            "label": "瞭解更多",
                            "data": 'type=2&number=1&menu=2'
                        }
                    },
                    {
                        "imageUrl": "https://i.imgur.com/7yEnx8p.jpeg",
                        "action": {
                            "type": "postback",
                            "label": "瞭解更多",
                            "data": 'type=3&number=1&menu=2'
                        }
                    },
                    {
                        "imageUrl": "https://i.imgur.com/eb61SdL.jpeg",
                        "action": {
                            "type": "postback",
                            "label": "瞭解更多",
                            "data": 'type=4&number=1&menu=2'
                        }
                    },
                    {
                        "imageUrl": "https://i.imgur.com/6hIA9Jt.jpeg",
                        "action": {
                            "type": "postback",
                            "label": "瞭解更多",
                            "data": 'type=5&number=1&menu=2'
                        }
                    },
                    {
                        "imageUrl": "https://i.imgur.com/eUJwARo.jpeg",
                        "action": {
                            "type": "postback",
                            "label": "瞭解更多",
                            "data": 'type=6&number=1&menu=2'
                        }
                    },
                    {
                        "imageUrl": "https://i.imgur.com/522zcBx.jpeg",
                        "action": {
                            "type": "postback",
                            "label": "瞭解更多",
                            "data": 'type=7&number=1&menu=2'
                        }
                    },
                    {
                        "imageUrl": "https://i.imgur.com/LSS0EQ9.jpeg",
                        "action": {
                            "type": "postback",
                            "label": "瞭解更多",
                            "data": 'type=8&number=1&menu=2'
                        }
                    },
                    {
                        "imageUrl": "https://i.imgur.com/Breo4z4.jpeg",
                        "action": {
                            "type": "postback",
                            "label": "瞭解更多",
                            "data": 'type=9&number=1&menu=2'
                        }
                    }
                ]
            }
        }
        return msg;
    }
};
module.exports = Menu2;