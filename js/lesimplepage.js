/* le simplepage */
$(function () {
  var markdown = new Markdown.Converter();

  // replace titlebar
  $('head title').html(Settings.titlebar);
  // replace favicon
  $('head link.favicon').attr('href', Settings.favicon);
  // replace header
  $('header.title #title').html(markdown.makeHtml(Settings.title));
  $('header.title #description').html(markdown.makeHtml(Settings.description));
  // replace footer
  $('footer #footer').html(markdown.makeHtml(Settings.footer));

  // replace contents
  $.each(Settings.contents, function(index, content) {
    if (!content.ref || content.ref.trim() === "") return;

    // load from the reference and update, must be synchronous to keep order
    $.ajax({  
      url: content.ref,
      dataType: 'text',
      success: function(data) {
        var titleHtml = '<p class="title"><a href="#">'+content.title+'</a></p>';
        var contentHtml = '<div class="content">'+markdown.makeHtml(data)+'</div>';

        var html = 
        '<section class="section" id=' + index +'>' +
        titleHtml + contentHtml + 
        '</section>';
        
        var datasection = 'section.content div[data-section]';
        $(datasection).append(html);

      },
      async: false
    });
  });
  // kickoff foundation
  $(document).foundation();
});


