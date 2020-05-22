'use strict';

// const personalMovieDB = {
//   count: 0,
//   movies: {},
//   actors: {},
//   genres: [],
//   privat: false,
//   start: function () {
//     personalMovieDB.count = +prompt('Сколько фильмов вы уже посмотрели?', '');

//     while (personalMovieDB.count == '' || numberOfFilms == null || isNaN(personalMovieDB.count)) {
//       personalMovieDB.count = +prompt('Сколько фильмов вы уже посмотрели?', '');
//     }
//   },
//   rememberMyFilms: function () {
//     for (let i = 0; i < 2; i++) {
//       const a = prompt('Один последних просмотреных фильмов');
//       const b = prompt('На сколько оцените его');

//       if (a != null && b != null && a != '' && b != '' && a.length < 50) {
//         personalMovieDB.movies[a] = b;
//       } else {
//         console.log('error');
//         i--;
//       }
//     }
//   },
//   detectPersonalLevel: function () {
//     if (personalMovieDB.count < 10) {
//       console.log('просмотрено очень мало фильмов');
//     } else if (personalMovieDB.count >= 10 && personalMovieDB.count < 30) {
//       console.log('вы классический зритель');
//     } else if (personalMovieDB.count >= 30) {
//       console.log('вы киноман');
//     } else {
//       console.log('ошибка');
//     }
//   },
//   showMyDB: function (hidden) {
//     if (!hidden) {
//       console.log(personalMovieDB);
//     }
//   },
//   toggleVisibleMyDB: function () {
//     if (personalMovieDB.privat) {
//       personalMovieDB.privat = false;
//     } else {
//       personalMovieDB.privat = true;
//     }
//   },
//   writeYourGenres: function () {
//     for (let i = 1; i <= 3; i++) {
//       let genre = prompt(`Ваш любимый жанр под номером ${i}`);

//       if (genre === '' || genre === null) {
//         console.log('Вы ввели некорректные данные');
//         i--;
//       } else {
//         personalMovieDB.genres[i - 1] = genre;
//       }
//     }

//     personalMovieDB.genres.forEach((item, i) => {
//       console.log(`Любимый жанр ${i + 1} - это ${item}`);
//     });
//   },
// };

document.addEventListener('DOMContentLoaded', () => {
  const movieDB = {
    movies: [
      "Логан",
      "Лига справедливости",
      "Ла-ла лэнд",
      "Одержимость",
      "Скотт Пилигрим против..."
    ]
  };

  const adv = document.querySelectorAll('.promo__adv img');
  const poster = document.querySelector('.promo__bg');
  const genre = poster.querySelector('.promo__genre');
  const movieList = document.querySelector('.promo__interactive-list');
  const addForm = document.querySelector('form.add');
  const addInput = addForm.querySelector('.adding__input');
  const checkbox = addForm.querySelector('[type="checkbox"]');

  addForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let newFilm = addInput.value;
    const favorite = checkbox.checked;

    if (newFilm) {

      if (newFilm.length > 21) {
        newFilm = `${newFilm.substring(0, 22)}...`;
      }

      if (favorite) {
        console.log('Добавляем любимый фильм');
      }

      movieDB.movies.push(newFilm);
      sortArr(movieDB.movies);

      createMovieList(movieDB.movies, movieList);
    }

    e.target.reset();

  });

  const deleteAdv = (arr) => {
    arr.forEach(item => {
      item.remove();
    });
  };

  const makeChanges = () => {
    genre.textContent = 'Драма';
    poster.style.backgroundImage = 'url("img/bg.jpg")';
  };

  const sortArr = (arr) => {
    movieDB.movies.sort();
  };

  function createMovieList(films, parent) {
    parent.innerHTML = '';
    sortArr(films);

    films.forEach((film, i) => {
      parent.innerHTML += `
        <li class="promo__interactive-item">${i+1} ${film}
         <div class="delete"></div>
       </li>
      `;
    });

    document.querySelectorAll('.delete').forEach((btn, i) => {
      btn.addEventListener('click', () => {
        btn.parentElement.remove();
        movieDB.movies.splice(i, 1);

        createMovieList(films, parent);
      });
    });
  };

  deleteAdv(adv);
  makeChanges();
  createMovieList(movieDB.movies, movieList);
});