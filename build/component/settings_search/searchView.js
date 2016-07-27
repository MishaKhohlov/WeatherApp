import {gEvent} from '../backboneEventsInit.js';

export let searchView = (function () {
  let input,
    acceptBtn,
    inputAccepBtn,
    addBtn;

  gEvent.on('dataUpdate', () => {
    searchView.onDelete();
    input.val('');
  });

  gEvent.on('selectDeleteCity', (data) => {
    if(Object.keys(data).length !== 0) {
      if (!addBtn.hasClass('icon-check')) {
        addBtn.addClass('icon-check');
      }
    } else {
      resetAcceptDel();
    }
  });

  gEvent.on('selectCity', () => {
    if (acceptBtn.hasClass('icon-delete')) {
      acceptBtn.removeClass('icon-delete');
      acceptBtn.addClass('icon-check');
    }
  });

  gEvent.on('disabledCity', () => {
    changeBtnOnDelete()
  });

  gEvent.on('addListCity', () => {
    changeBtnOnDelete();
    input.val('');
  });

  gEvent.on('resetAddData', () => {
    searchView.onDelete();
  });

  gEvent.on('resetAddData', () => {
    resetAcceptDel();
  });

  gEvent.on('deletedCityList', () => {
    resetAcceptDel();
  });

  function changeBtnOnDelete() {
    if (acceptBtn.hasClass('icon-check')) {
      acceptBtn.removeClass('icon-check');
      acceptBtn.addClass('icon-delete');
    }
  }

  function resetAcceptDel() {
    if (addBtn.hasClass('icon-check')) {
      addBtn.removeClass('icon-check');
    }
    acceptBtn.css('color', 'white');
  }

  return {
    initElements: () => {
      input = $(".menu_set_search__inp");
      acceptBtn = $('.menu_set_search__del');
      addBtn = $('.menu_set_search__addBut');
      inputAccepBtn = $('.menu_set_search__add_inp');
    },

    onAccept: () => {
      if (acceptBtn.hasClass('icon-delete')) {
        acceptBtn.removeClass('icon-delete');
        acceptBtn.addClass('icon-check');
      }
    },

    onDelete: () => {
      if (acceptBtn.hasClass('icon-check')) {
        acceptBtn.removeClass('icon-check');
        acceptBtn.addClass('icon-delete');
      }
    },

    acceptDeleteCitiesDefault: () => {
      if(inputAccepBtn.prop("checked")) {
        inputAccepBtn.prop("checked", false);
      } else {
        inputAccepBtn.prop("checked", true);
      }
    },

    deleteIconActive: ()=> {
      acceptBtn.css('color', 'red');
    },

    event: {
      onChange: (callback) => {
        input.on('input', callback);
      },

      onAcceptChange: (callback) => {
        acceptBtn.on('click', callback);
      },

      acceptDeleteCities: (callback) => {
        addBtn.click(callback)
      }
    }
  }
}());
