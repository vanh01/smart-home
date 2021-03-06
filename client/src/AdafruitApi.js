var myAdafruitApi = (function () {
    var instance;
    var userName = "vanh01"; // username
    var xAioKey = "aio_nlle75SnyUL2NO8OdkLwqJoqH6pF"; // active key
    var baseUrl = "https://io.adafruit.com";

    const get = async (feedKey) => {
        var myHeaders = new Headers();
        myHeaders.append("X-AIO-Key", xAioKey);

        var requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow",
        };
        var value;

        await fetch(
            `${baseUrl}/api/v2/${userName}/feeds/${feedKey}/data/last`,
            requestOptions
        )
            .then((response) => response.json())
            .then((result) => {
                // console.log(result);
                value = result.value;
            })
            .catch((error) => {
                console.log("error", error);
            });
        // console.log(value);
        return value;
    }

    const post = async (feedKey, data) => {
        var myHeaders = new Headers();
        myHeaders.append("X-AIO-Key", xAioKey);
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: data,
            redirect: "follow",
        };

        await fetch(
            `${baseUrl}/api/v2/${userName}/feeds/${feedKey}/data`,
            requestOptions
        )
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.log("error", error));
    }
    function init() {
        return {
            switchLed: async (ledOn) => {
                var value = ledOn ? "led-on web" : "led-off web";
                var data = JSON.stringify({
                    value: value,
                });
                await post("bk-iot-led", data);
            },

            switchAir : async (airOn) => {
                var value = airOn ? "air-on web" : "air-off web";

                var data = JSON.stringify({
                    value: value,
                });
                await post("bk-iot-air-condition", data);
            },

            postData : async (value, feedKey) => {
                var data = JSON.stringify({
                    value: value,
                });
                await post(feedKey, data);
            },

            getLed: async () => {
                var value = await get("bk-iot-led");
                return value === "led-on web" ? true : false;
            },

            getAir : async () => {
                var value = await get("bk-iot-air-condition");
                return value === "air-on" ? true : false;
            },

            getActive: async (feedKey) => {
                var value = await get(feedKey);
                return value === "true" ? true : false;
            },

            getData: async (feedKey) => {
                var value = await get(feedKey);
                return value.toString();
            },
        }
    }

    return {
        getInstance: function () {
            if (!instance) {
                instance = init();
            }
            return instance;
        }
    }
})();

export default myAdafruitApi;