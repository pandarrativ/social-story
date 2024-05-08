import { Excalidraw, MainMenu } from "@excalidraw/excalidraw";

function Testing() {
    return ( 
        <div className="w-full p-36 bg-gray-3">
            <h1 style={{ textAlign: "center" }}>Excalidraw Example</h1>
            <div style={{ height: "500px" }}>
                <Excalidraw>
                    <MainMenu>
                    <MainMenu.Group title="File Operations">
                        <MainMenu.DefaultItems.LoadScene/>
                        <MainMenu.DefaultItems.SaveAsImage/>
                        <MainMenu.DefaultItems.Export/>
                    </MainMenu.Group>
                    <MainMenu.Group title="Canvas Operations">
                        <MainMenu.DefaultItems.ToggleTheme/>
                        <MainMenu.DefaultItems.ClearCanvas/>
                        <MainMenu.DefaultItems.ChangeCanvasBackground/>
                    </MainMenu.Group>
                    </MainMenu>
                </Excalidraw>
                
            </div>
        </div>
     );
}

export default Testing;