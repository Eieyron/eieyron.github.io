console.log("im in");

colors = [
  "red",
  "orange",
  "tangerine",
  "yellow",
  "green",
  "teal",
  "light-blue",
];

facts = {
  uncategorized: {},
};

categories_shown = false;
active_category = "";

// * LOADER MANIPULATION
function show_loader() {
  $("#loader").removeClass("unshow");
  console.log("shoewn");
}

// * unshow loader
function unshow_loader() {
  $("#loader").addClass("unshow");
}

function get_category_facts(number, category, show_error = false) {
  show_loader();
  console.log("lol");

  hit_limit = 10;
  hit_limit_counter = 0;

  jokes_gathered_ids = [];

  // get number of facts and append it to the list
  jokes_gathered = 0;
  while (jokes_gathered < number) {
    $.ajax({
      async: false,
      type: "GET",
      url: `https://api.chucknorris.io/jokes/random?category=${category}`,
      success: (facts_data) => {
        if (facts_data.id in facts[category]) {
          hit_limit_counter = hit_limit_counter + 1;
          if (hit_limit_counter > hit_limit) {
            if (show_error) {
              if (jokes_gathered == 0) {
                alert("No more facts available on this category.");
              }
            }
            jokes_gathered = number;
          }
        } else {
          facts[category][facts_data.id] = {
            likes: 0,
            dislikes: 0,
            fact: facts_data.value,
          };
          jokes_gathered_ids.push(facts_data.id);
          $("#facts-list").append(`
                <div class="fact-card" id="${facts_data.id}">
                    <div id="fact-status-${facts_data.id}" class="fact-status-popular">POPULAR</div>
                    "${facts_data.value}"
                    <div class="likes">
                        <div id="like-button-${facts_data.id}" class="like-button">
                            <div id="like-counter-${facts_data.id}" class="like-counter">0</div>
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                viewBox="0 0 24 24"
                                width="25"
                                height="25"
                                class="w-6 h-6">
                                <path d="M7.493 18.75c-.425 0-.82-.236-.975-.632A7.48 7.48 0 016 15.375c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75 2.25 2.25 0 012.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23h-.777zM2.331 10.977a11.969 11.969 0 00-.831 4.398 12 12 0 00.52 3.507c.26.85 1.084 1.368 1.973 1.368H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 01-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227z" />
                            </svg>
                        </div>
                        <div id="dislike-button-${facts_data.id}" class="dislike-button">
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                viewBox="0 0 24 24" 
                                width="25"
                                height="25"
                                class="w-6 h-6">
                                <path d="M15.73 5.25h1.035A7.465 7.465 0 0118 9.375a7.465 7.465 0 01-1.235 4.125h-.148c-.806 0-1.534.446-2.031 1.08a9.04 9.04 0 01-2.861 2.4c-.723.384-1.35.956-1.653 1.715a4.498 4.498 0 00-.322 1.672V21a.75.75 0 01-.75.75 2.25 2.25 0 01-2.25-2.25c0-1.152.26-2.243.723-3.218C7.74 15.724 7.366 15 6.748 15H3.622c-1.026 0-1.945-.694-2.054-1.715A12.134 12.134 0 011.5 12c0-2.848.992-5.464 2.649-7.521.388-.482.987-.729 1.605-.729H9.77a4.5 4.5 0 011.423.23l3.114 1.04a4.5 4.5 0 001.423.23zM21.669 13.773c.536-1.362.831-2.845.831-4.398 0-1.22-.182-2.398-.52-3.507-.26-.85-1.084-1.368-1.973-1.368H19.1c-.445 0-.72.498-.523.898.591 1.2.924 2.55.924 3.977a8.959 8.959 0 01-1.302 4.666c-.245.403.028.959.5.959h1.053c.832 0 1.612-.453 1.918-1.227z" />
                            </svg>
                        </div>
                    </div>
                </div>
            `);
          jokes_gathered = jokes_gathered + 1;
        }
      },
    });
  }

  // assign listeners to all created
  jokes_gathered_ids.map((id) => {
    $(`#like-button-${id}`).click((e) => {
      like(id);
    });
    $(`#dislike-button-${id}`).click((e) => {
      dislike(id);
    });
  });

  unshow_loader();
}

function show_category_facts(category) {
  for (id in facts[category]) {
    if (id === "color") {
      // pass
    } else {
      likes = facts[category][id].likes;

      fact_status = "POPULAR";

      if (likes >= 5 && likes <= 10) {
        fact_status = "TRENDING";
      } else if (likes >= 11) {
        fact_status = "EPIC";
      }

      $("#facts-list").append(`
            <div class="fact-card" id="${id}">
                <div id="fact-status-${id}" class="fact-status-${fact_status.toLowerCase()}">${fact_status}</div>
                "${facts[category][id].fact}"
                <div class="likes">
                    <div id="like-button-${id}" class="like-button">
                        <div id="like-counter-${id}" class="like-counter">${
        facts[category][id].likes
      }</div>
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            viewBox="0 0 24 24"
                            width="25"
                            height="25"
                            class="w-6 h-6">
                            <path d="M7.493 18.75c-.425 0-.82-.236-.975-.632A7.48 7.48 0 016 15.375c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75 2.25 2.25 0 012.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23h-.777zM2.331 10.977a11.969 11.969 0 00-.831 4.398 12 12 0 00.52 3.507c.26.85 1.084 1.368 1.973 1.368H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 01-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227z" />
                        </svg>
                    </div>
                    <div id="dislike-button-${id}" class="dislike-button">
                        <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            viewBox="0 0 24 24" 
                            width="25"
                            height="25"
                            class="w-6 h-6">
                            <path d="M15.73 5.25h1.035A7.465 7.465 0 0118 9.375a7.465 7.465 0 01-1.235 4.125h-.148c-.806 0-1.534.446-2.031 1.08a9.04 9.04 0 01-2.861 2.4c-.723.384-1.35.956-1.653 1.715a4.498 4.498 0 00-.322 1.672V21a.75.75 0 01-.75.75 2.25 2.25 0 01-2.25-2.25c0-1.152.26-2.243.723-3.218C7.74 15.724 7.366 15 6.748 15H3.622c-1.026 0-1.945-.694-2.054-1.715A12.134 12.134 0 011.5 12c0-2.848.992-5.464 2.649-7.521.388-.482.987-.729 1.605-.729H9.77a4.5 4.5 0 011.423.23l3.114 1.04a4.5 4.5 0 001.423.23zM21.669 13.773c.536-1.362.831-2.845.831-4.398 0-1.22-.182-2.398-.52-3.507-.26-.85-1.084-1.368-1.973-1.368H19.1c-.445 0-.72.498-.523.898.591 1.2.924 2.55.924 3.977a8.959 8.959 0 01-1.302 4.666c-.245.403.028.959.5.959h1.053c.832 0 1.612-.453 1.918-1.227z" />
                        </svg>
                    </div>
                </div>
            </div>
        `);
    }
  }
}

function new_category_selected(category) {
  console.log("new category");

  $("#active-category").removeClass(facts[active_category].color);
  $("#facts-list").html("");

  active_category = category;

  $("#active-category").html(active_category);
  $("#active-category").addClass(facts[active_category].color);

  if (Object.keys(facts[active_category]).length > 1) {
    show_category_facts(active_category);
  } else {
    get_category_facts(6, active_category);
  }
}

function show_all_categories() {
  console.log("show all categories");
  if (!categories_shown) {
    categories_shown = true;
    $("#categories-list")
      .children()
      .map((index, child) => {
        //   console.log("child", child);
        if ($(child).hasClass("unshow")) {
          $(child).removeClass("unshow");
        }

        if (child.id === "last") {
          $("#view-all-categories").html(`
              <a class="hook_up">BACK</a>
            `);
        }
      });
  } else {
    categories_shown = false;
    $("#categories-list")
      .children()
      .map((index, child) => {
        // console.log("child", child);
        if (child.id === "last") {
          $("#view-all-categories").html(`
            <a class="hook_down">VIEW ALL</a>
          `);
        } else if (index > 6) {
          $(child).addClass("unshow");
        }
      });
  }
}

function like(id) {
  console.log("liked", id);
  console.log(++facts[active_category][id].likes);
  $(`#like-counter-${id}`).html(facts[active_category][id].likes);

  fact_status = "POPULAR";

  if (
    facts[active_category][id].likes >= 5 &&
    facts[active_category][id].likes <= 10
  ) {
    fact_status = "TRENDING";
  } else if (facts[active_category][id].likes >= 11) {
    fact_status = "EPIC";
  }

  $(`#fact-status-${id}`).html(fact_status);
  $(`#fact-status-${id}`).removeClass();
  $(`#fact-status-${id}`).addClass(`fact-status-${fact_status.toLowerCase()}`);
}

function dislike(id) {
  console.log("disliked", id);
  console.log(--facts[active_category][id].likes);
  $(`#like-counter-${id}`).html(facts[active_category][id].likes);

  fact_status = "POPULAR";

  if (
    facts[active_category][id].likes >= 5 &&
    facts[active_category][id].likes <= 10
  ) {
    fact_status = "TRENDING";
  } else if (facts[active_category][id].likes >= 11) {
    fact_status = "EPIC";
  }

  $(`#fact-status-${id}`).html(fact_status);
  $(`#fact-status-${id}`).removeClass();
  $(`#fact-status-${id}`).addClass(`fact-status-${fact_status.toLowerCase()}`);
}

// * Main
function main() {
  // * get all categories
  $.ajax({
    type: "GET",
    url: "https://api.chucknorris.io/jokes/categories",
    success: (data) => {
      // map all categories
      data.map((category, index) => {
        if (index == 0) active_category = category;

        // hide categories that are more than 6
        if (index > 6) {
          $("#categories-list").append(`
                <li class="unshow"><a href="#" class="selection_button ${
                  colors[index % 7]
                }" id="${category}">${category.toUpperCase()}</a></li>
            `);
        } else {
          $("#categories-list").append(`
                <li><a href="#" class="selection_button ${
                  colors[index % 7]
                }" id="${category}">${category.toUpperCase()}</a></li>
            `);
        }

        facts[category] = {
          color: colors[index % 7],
        };
      });

      // show view all hoook
      $("#categories-list").append(`
            <li id="last">
                <div id="view-all-categories" class="button">
                    <a class="hook_down">VIEW ALL</a>
                </div>
            </li>
        `);

      // add view categories listener
      $("#view-all-categories").click((e) => {
        show_all_categories();
      });

      // set default category and category facts
      console.log(active_category);
      $("#active-category").html(active_category);
      $("#active-category").addClass(facts[active_category].color);
    },
  }).then((data) => {
    // add listeners to selection button
    $(".selection_button").click((e) => {
      console.log("added listener", e.target.id);
      new_category_selected(e.target.id);
    });

    get_category_facts(6, active_category);

    $("#fetching-jokes").addClass("unshow");
    $("#view-more-div").append(`
        <div id="view-more-jokes" class="button">
            <a class="hook_down">VIEW MORE</a>
        </div>
    `);
    $("#view-more-jokes").click((e) => {
      get_category_facts(3, active_category, true);
    });
  });

  // add listeners
  $("#search-input").keyup((e) => {
    // console.log("target", e.target.value);

    $.get(
      `
        https://api.chucknorris.io/jokes/search?query=${e.target.value}
        `,
      (data) => {
        $("#search-list").html("");

        if (e.target.value === "") {
          $("#search-dropdown").css({
            display: "none",
          });
        } else {
          data.result.slice(0, 10).map((fact) => {
            if (fact.categories.length > 0) {
              category = fact.categories[0];
            } else {
              category = "uncategorized";
            }

            $("#search-list").append(`
                            <li>
                                <div class="dropdown-category">${category}</div>
                                ${fact.value.slice(0, 30)}...
                            </li>
                        `);
          });

          x = $("#search-input").position();
          $("#search-dropdown").css({
            left: `${x.left}px`,
            top: `${x.top + 100}px`,
            display: "flex",
          });
        }
      }
    );
  });

  $("#search-input").focusout((e) => {
    $("#search-dropdown").css({
      display: "none",
    });
  });

  console.log(facts);
}

main();
