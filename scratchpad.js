{tag:"div", id:"frmPost", style: "display:none", class:"w3-card-4", child:
    {tag: "div", class: "w3-row-padding", child:
        [{tag: "h4"},
        {tag:"textarea", id:"text"},
        {tag: "nav", child:
            [{tag:"a", child: {tag: "i", class: "fa fa-image-o fileselect", child:
                {tag: "input", id: "image", class:"upload image", sytle: "display:none"}}},
            {tag:"a", child: {tag: "i", class: "fa fa-video-o fileselect", child:
                {tag: "input", id: "video", class:"upload video", sytle: "display:none"}}},
            {tag:"a", child: {tag: "i", class: "fa fa-audio-o fileselect", child:
                {tag: "input", id: "audio", class:"upload audio", sytle: "display:none"}}}]},
        {tag: "div", child: {tag: "img", id: "preview-image"}},
        {tag: "div", child: {tag: "video", id: "preview-video"}},
        {tag: "div", child: {tag: "audio", id: "preview-audio"}},
        {tag: "button", id: "btnSubmitPost"}]}}

                    <div id="frmPost" class="w3-card-4" style="display: none">  
                        <div class="w3-row-padding w3-light-grey">
                            <h4>New Post</h4>
                            <textarea class="w3-input" id="text" name="text"></textarea>
                            <nav class="w3-topnav">
                                <a href="#">
                                    <i class="fa fa-file-image-o">Image
                                        <input type="file" id="image" name="image" accept ="image/*" 
                                            style="display: none" class="image upload"/> 
                                    </i>
                                </a>
                                <a href="#">
                                    <i class="fa fa-file-video-o">Video
                                        <input type="file" id="video" name="video" accept ="video/*" 
                                            style="display: none" class="video upload"/>                                     
                                    </i>
                                </a>
                                <a href="#">
                                    <i class="fa fa-file-audio-o">Audio
                                        <input type="file" id="audio" name="audio" accept ="audio/*" 
                                            style="display: none" class="audio upload"/>                                                     
                                    </i>
                                </a>
                            </nav>                            
                            <div>
                                <img src="./images/100x100.jpg" alt="Prevew Image" id="preview-image" 
                                    style="display:none" width="100px" height="100px"/>
                            </div>
                            <div>
                                <video width="128" height="96" controls style="display:none" id="preview-video">
                                    <source src="">
                                </video>
                            </div>
                            <div>
                                <audio controls style="display:none" id="preview-audio">
                                    <source src="">
                                </audio>
                            </div>
                            <button class="btn btn-primary pull-right" id="btnSubmitPost">Post</button>
                        </div>
                    </div>    























