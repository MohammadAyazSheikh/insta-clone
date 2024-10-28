type pageProps = {
    width?: number | string,
    height?: number | string,
    longitude?: number,
    latitude?: number,
}
export const getMapPageHtml = (options: pageProps) => {

    const {
        width,
        height,
        longitude,
        latitude,
    } = options;




    const html = `
<!DOCTYPE html>
<html>

    <head>
        <meta charset="UTF-8">
        <meta name="viewport", initial-scale=1.0">
        <style>
       
        .zoom-in {
            transform-origin: center;
            transform: scale(4); 
        }

    </style>
    </head>


    <body>

        <div id="googleMap" class = "zoom-in" style="width:${width || '100vw'};height:${height || '100vh'}"></div>

        <script>
            async function myMap() {
        
                    // coordinates
                    const position = { 
                        lat: ${latitude || 51.508742},
                        lng: ${longitude || -0.120850} 
                    };

                    // Request needed libraries.
                    //@ts-ignore
                    const { Map } = await google.maps.importLibrary("maps");
                    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
                
                    // rendering map
                    map = new Map(document.getElementById("googleMap"), {
                        zoom : 18,
                        disableDefaultUI: true,
                        gestureHandling: "none",
                        center: position,
                        mapId: "DEMO_MAP_ID",
                    });
                


                    // The marker, positioned at coordinate
                    const marker = new AdvancedMarkerElement({
                        map: map,
                        position: position,
                        title: "",
                    });

                }
            
        </script>

        <script
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB7Haog03RkW-Jw_gjxDBt5reynjLGw4-c&callback=myMap"></script>

    </body>

</html>
`
    return (
        html
    )
}