/**
 * Created by lizhigao on 2015/8/28.
 */
(function($){
    var $imgContainer = $('#J_img_container'),
        $handler = $('div.shover-item', $imgContainer),
        $window = $(window),
        $document = $(document),
        options = {
            autoResize: true, // This will auto-update the layout when the browser window is resized.
            container: $imgContainer, // Optional, used for some extra CSS styling
            offset: 5, // Optional, the distance between grid items
            itemWidth: 210 // Optional, the width of a grid item
        };
    /**
     * Reinitializes the wookmark handler after all images have loaded
     */
    function applyLayout() {
        $imgContainer.imagesLoaded(function() {
            // Destroy the old handler
            if ($handler.wookmarkInstance) {
                $handler.wookmarkInstance.clear();
            }
            // Create a new layout handler.
            $handler = $('div.shover-item', $imgContainer);
            $handler.wookmark(options);
        });
    }
    /**
     * When scrolled all the way to the bottom, add more tiles
     */
    function onScroll() {
        // Check if we're within 100 pixels of the bottom edge of the broser window.
        var winHeight = window.innerHeight ? window.innerHeight : $window.height(), // iphone fix
            closeToBottom = ($window.scrollTop() + winHeight > $document.height() - 100);
        if (closeToBottom) {
            // Get the first then items from the grid, clone them, and add them to the bottom of the grid
            var $items = $('div.shover-item', $imgContainer),
                $firstTen = $items.slice(0, 10);
            $imgContainer.append($firstTen.clone());
            applyLayout();
        }
    }
    // Call the layout function for the first time
    //setTimeout(function(){
        applyLayout();
    //}, 100);
    // Capture scroll event.
    $window.on('scroll.wookmark', onScroll);

    //call shover
    $imgContainer.ZgSlipHover({
        target: '.shover-item',
        duration: 'fast',
        caption: '.caption'
    })
})(jQuery);


