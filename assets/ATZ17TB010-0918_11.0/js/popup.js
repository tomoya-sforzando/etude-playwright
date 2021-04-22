$(function () {
  $(".movie__video").click(function () {
    var id = $(this).attr("data-id");
    var popup = $("#" + id);
    $(popup).fadeIn(300).css("display", "flex");
    var width = $(popup).find("video").width();
    var height = $(popup).find("video").height();
    var wWidth = $("#wrapper").width();
    var wHeight = $("#wrapper").height();
    var eWidth = wWidth * 0.8;
    var eHeight = (eWidth * height) / width;
    if (eHeight > wHeight) {
      eHeight = wHeight * 0.8;
      eWidth = (eHeight * width) / height;
      $(popup).find("video").css("width", eWidth);
      $(popup).find("video").css("height", "auto");
    } else {
      $(popup).find("video").css("height", eHeight);
      $(popup).find("video").css("width", "auto");
    }
    $(popup).find("video").sp4iRep();
    $(popup).find("video").get(0).play();
    $("body").css("overflow", "hidden");
  });
  $(".popup__close").click(function () {
    $(this).parents(".movie__popup").hide();
    $(this).parents(".movie__popup").find("video").get(0).pause();
    $("body").css("overflow", "");
  });
});
