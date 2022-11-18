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

/*

  this is how facts are stored in the dictionary:

  facts = {
    category: {
      color: red,
      fact_id: {
        likes: 0,
        dislikes: 0,
        fact: "quotation",
      }
    }
  }

*/

facts = {
  uncategorized: {
    color: "khaki",
  },
};

categories_shown = false;
active_category = "";
active_fact = {};

// * LOADER MANIPULATION
function show_loader() {
  $("#loader").removeClass("unshow");
  console.log("shoewn");
}

// * unshow loader
function unshow_loader() {
  $("#loader").addClass("unshow");
}

// * CONSTRUCTORS
function create_new_fact(fact) {
  // creates a new fact object
  return {
    likes: 0,
    dislikes: 0,
    fact: fact,
  };
}

function get_fact_status(fact) {
  console.log(fact);

  fact_status = "POPULAR";

  if (fact.likes >= 5 && fact.likes <= 10) {
    fact_status = "TRENDING";
  } else if (fact.likes >= 11) {
    fact_status = "EPIC";
  }

  return fact_status;
}

function create_fact_card(id, category) {
  // creates card for fact
  fact = facts[category][id];

  fact_status = get_fact_status(fact);

  return `
    <div class="fact-card" id="${id}">
        <div id="fact-status-${id}" class="fact-status-${fact_status.toLowerCase()}">${fact_status}</div>
        "${fact.fact}"
        <div class="like-dislike-footer">
            <a class="hook">SEE STATS</a>
        </div>
    </div>
  `;
}

function create_fact_card_single(id, category) {
  fact = facts[category][id];
  console.log(id, category);
  console.log(fact);

  fact_status = get_fact_status(fact);

  return `
    <div class="fact-card-large">
      <div class="fact-card-large-header">
        <div id="joke-category-${id}" class="category_header ${
    facts[category].color
  }">
          ${category}
        </div>
        <div id="fact-status-large-${id}" class="fact-status-${fact_status.toLowerCase()}">
          ${fact_status}
        </div>
      </div>
      <div class="fact-container">"${fact.fact}"</div>
      <div class="like-dislike-footer">
            <div id="like-button-large-${id}" class="like-button">
                <div 
                  id="like-counter-large-${id}" 
                  class="like-counter">${fact.likes}</div>
                  <div class="like-container">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"

                      width=25
                      height=25

                      stroke-width="1.5"
                      class="w-6 h-6"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
                      />
                    </svg>
                  </div>
            </div>
            <div id="dislike-button-large-${id}" class="dislike-button">
                <div 
                  id="dislike-counter-large-${id}" 
                  class="dislike-counter">${fact.dislikes}</div>

                <div class="dislike-container">
                  <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 24 24" 
                      width="25"
                      height="25"
                      stroke-width="1.5"
                      class="w-6 h-6">
                      <path d="M15.73 5.25h1.035A7.465 7.465 0 0118 9.375a7.465 7.465 0 01-1.235 4.125h-.148c-.806 0-1.534.446-2.031 1.08a9.04 9.04 0 01-2.861 2.4c-.723.384-1.35.956-1.653 1.715a4.498 4.498 0 00-.322 1.672V21a.75.75 0 01-.75.75 2.25 2.25 0 01-2.25-2.25c0-1.152.26-2.243.723-3.218C7.74 15.724 7.366 15 6.748 15H3.622c-1.026 0-1.945-.694-2.054-1.715A12.134 12.134 0 011.5 12c0-2.848.992-5.464 2.649-7.521.388-.482.987-.729 1.605-.729H9.77a4.5 4.5 0 011.423.23l3.114 1.04a4.5 4.5 0 001.423.23zM21.669 13.773c.536-1.362.831-2.845.831-4.398 0-1.22-.182-2.398-.52-3.507-.26-.85-1.084-1.368-1.973-1.368H19.1c-.445 0-.72.498-.523.898.591 1.2.924 2.55.924 3.977a8.959 8.959 0 01-1.302 4.666c-.245.403.028.959.5.959h1.053c.832 0 1.612-.453 1.918-1.227z" />
                  </svg>
                </div>
            </div>
        </div>
    </div>
  `;
}

function bind_listeners_to_facts_card(id, category) {
  // add like/dislike listeners
  // $(`#like-button-${id}`).click((e) => {
  //   like(id, category);
  // });
  // $(`#dislike-button-${id}`).click((e) => {
  //   dislike(id, category);
  // });

  // add single fact shower
  $(`#${id}`).click((e) => {
    show_single_fact(id, category);
  });
}

function bind_listeners_to_facts_card_large(id, category) {
  // add like/dislike listeners
  $(`#like-button-large-${id}`).click((e) => {
    like(id, category, true);
  });
  $(`#dislike-button-large-${id}`).click((e) => {
    dislike(id, category, true);
  });

  // add single fact shower
  $(`#${id}`).click((e) => {
    show_single_fact(id, category);
  });
}

function like(id, category, large = false) {
  // * like button listener
  add_string = "";
  if (large) add_string = "-large";
  console.log(`clicked${add_string}`);

  $(`#like-counter${add_string}-${id}`).html(++facts[category][id].likes);

  fact_status = get_fact_status(facts[category][id]);

  $(`#fact-status${add_string}-${id}`).html(fact_status);
  $(`#fact-status${add_string}-${id}`).removeClass();
  $(`#fact-status${add_string}-${id}`).addClass(
    `fact-status-${fact_status.toLowerCase()}`
  );
}

function dislike(id, category, large = false) {
  // * dislike button listener
  add_string = "";
  if (large) add_string = "-large";

  // add dislike
  $(`#dislike-counter${add_string}-${id}`).html(++facts[category][id].dislikes);

  // update fact status
  fact_status = get_fact_status(facts[category][id]);

  $(`#fact-status${add_string}-${id}`).html(fact_status);
  $(`#fact-status${add_string}-${id}`).removeClass();
  $(`#fact-status${add_string}-${id}`).addClass(
    `fact-status-${fact_status.toLowerCase()}`
  );
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
          // algo to stop searching for jokes after a few failed attempts
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
          jokes_gathered_ids.push(facts_data.id);

          // create new fact and add to list
          facts[category][facts_data.id] = create_new_fact(facts_data.value);
          $("#facts-list").append(create_fact_card(facts_data.id, category));

          jokes_gathered = jokes_gathered + 1;
        }
      },
    });
  }

  // assign listeners to all created
  jokes_gathered_ids.map((id) => {
    bind_listeners_to_facts_card(id, category);
  });

  unshow_loader();
}

function get_new_fact(category) {
  // gets 1 new fact and returns it
  to_return = {
    id: "",
    category: category,
  };

  hit_limit = 10;
  hit_limit_counter = 0;

  // loop to hit limit until it breaks
  while (hit_limit_counter < hit_limit) {
    $.ajax({
      async: false,
      type: "GET",
      url: `https://api.chucknorris.io/jokes/random?category=${category}`,
      success: (facts_data) => {
        if (facts_data.id in facts[category]) {
          // algo to stop searching for jokes after a few failed attempts
          hit_limit_counter = hit_limit_counter + 1;
          if (hit_limit_counter > hit_limit) {
            if (show_error) {
              if (jokes_gathered == 0) {
                alert("No more facts available on this category.");
                hit_limit_counter = hit_limit;
              }
            }
          }
        } else {
          // create new fact and add to list
          facts[category][facts_data.id] = create_new_fact(facts_data.value);
          to_return = {
            id: facts_data.id,
            category: category,
          };
          hit_limit_counter = hit_limit;
        }
      },
    });
  }

  return to_return;
}

function show_category_facts(category) {
  // shows pre-existing category facts

  for (id in facts[category]) {
    if (id === "color") {
      // pass
    } else {
      $("#facts-list").append(create_fact_card(id, category));
      bind_listeners_to_facts_card(id, category);
    }
  }
}

function new_category_selected(category) {
  // listener function when a new category is clicked

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

function show_single_fact(id, category) {
  // * shows single page fact

  // hide group facts
  $("#category-jokes").addClass("unshow");

  // show single page fact with big card
  $("#single-jokes").removeClass("unshow");

  // show single joke big page version
  $("#single-fact-div").html(create_fact_card_single(id, category));

  // add listeners to single-fact-card
  bind_listeners_to_facts_card_large(id, category);

  active_fact = {
    id: id,
    category: category,
  };
}

function next_fact() {
  //* gets the next fact in the category, if none anymore, fetches a new one

  id = active_fact.id;
  category = active_fact.category;

  facts_category_keys = Object.keys(facts[category]);
  fact_index = facts_category_keys.indexOf(id);

  // if fact_index == category length -1, it's the last
  if (fact_index == facts_category_keys.length - 1) {
    fact_details = get_new_fact(category);
    if (fact_details.id) {
      show_single_fact(fact_details.id, category);
    } else {
      // if none returned, loop to the first element
      show_single_fact(facts_category_keys[1], category);
    }
  } else {
    show_single_fact(facts_category_keys[fact_index + 1], category);
  }
  // else, get the next
}

function prev_fact() {
  //* gets the prev fact in the category, if none anymore, fetches a new one

  id = active_fact.id;
  category = active_fact.category;

  facts_category_keys = Object.keys(facts[category]);
  fact_index = facts_category_keys.indexOf(id);

  // if fact_index == 1, it's the last previous fact, loop to the last fact
  if (fact_index == 1) {
    show_single_fact(
      facts_category_keys[facts_category_keys.length - 1],
      category
    );
  } else {
    show_single_fact(facts_category_keys[fact_index - 1], category);
  }
  // else, get the next
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
                <li class="unshow"><a class="selection_button ${
                  colors[index % 7]
                }" id="${category}">${category.toUpperCase()}</a></li>
            `);
        } else {
          $("#categories-list").append(`
                <li><a class="selection_button ${
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

  // * SEARCHING FUNCTIONALITY

  //setup before functions
  var typingTimer; //timer identifier
  var doneTypingInterval = 500; //time in ms, 5 seconds for example

  //user is "finished typing," do something
  function doneTyping() {
    search_term = $("#search-input").val();

    $.get(
      `
        https://api.chucknorris.io/jokes/search?query=${search_term}
        `,
      (data) => {
        console.log("what?", search_term);
        $("#search-list").html("");

        if (search_term === "") {
          $("#search-dropdown").css({
            display: "none",
          });
        } else {
          if (data.result.length == 0) {
            alert("No Facts found!");
          } else if (data.result.length == 1) {
            $("#search-dropdown").css({
              display: "none",
            });

            fact = data.result[0];

            if (fact.categories.length > 0) {
              category = fact.categories[0];
            } else {
              category = "uncategorized";
            }

            // if fact doesnt exist on database, creates new one
            if (!(fact.id in facts[category])) {
              facts[category][fact.id] = create_new_fact(fact.value);
            }

            show_single_fact(fact.id, category);
            // show 1 joke
          } else {
            data.result.slice(0, 10).map((fact) => {
              console.log(fact);

              if (fact.categories.length > 0) {
                category = fact.categories[0];
              } else {
                category = "uncategorized";
              }

              // if fact doesnt exist on database, creates new one
              if (!(fact.id in facts[category])) {
                facts[category][fact.id] = create_new_fact(fact.value);
              }

              $("#search-list").append(`
                  <li id="search-${fact.id}" data-category="${category}">
                      <div class="search-col-1" >
                        <div class="search-category ${
                          facts[category].color
                        }">${category}</div>
                      </div>
                      <div class="search-col-2">
                        ${fact.value.slice(0, 25)}...
                      </div>
                  </li>
              `);

              // add listener to search term
              $("#search-" + fact.id).on("mousedown", (e) => {
                console.log(
                  "search tearm clicked",
                  fact.id,
                  $("#search-" + fact.id).data("category")
                );
                show_single_fact(
                  fact.id,
                  $("#search-" + fact.id).data("category")
                );
              });

              console.log(
                "added listeners to",
                $("#search-" + fact.id),
                category
              );
            });

            x = $("#search-input").position();
            $("#search-dropdown").css({
              left: `${x.left}px`,
              top: `${x.top + 100}px`,
              display: "flex",
            });
          }
        }
      }
    );
  }

  $("#search-input").keyup((e) => {
    // console.log("target", e.target.value);
    if (e.keyCode == 13) {
      // if entered
      clearTimeout(typingTimer);
      doneTyping();
    } else {
      clearTimeout(typingTimer);
      typingTimer = setTimeout(doneTyping, doneTypingInterval);
    }
  });

  $("#search-input").keydown((e) => {
    // console.log("target", e.target.value);
    clearTimeout(typingTimer);
  });

  $("#search-input").focusout((e) => {
    $("#search-dropdown").css({
      display: "none",
    });
  });

  // add listener to single page joke back
  $("#single-jokes-back").click((e) => {
    // show category facts
    $("#category-jokes").removeClass("unshow");

    // hide single page facts
    $("#single-jokes").addClass("unshow");
    new_category_selected(active_category);

    // clear single-fact div
    $("#single-fact-div").html("");
  });

  // add listener to next joke
  $("#next-fact").click((e) => {
    next_fact();
  });

  $("#prev-fact").click((e) => {
    prev_fact();
  });

  console.log(facts);
}

main();
