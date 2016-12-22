let List = function({ items }) {
    return (
        <ul>
            {items.map(item => 
                <li key={item.id}>{item.name}</li>
            )}
        </ul>
    );
}

// ?


.button {
  border-radius: 4px;
  background-color: LightCyan;
}

import React from 'react';
import styles from './Widget1.css';
// styles == {
//   button: "Widget1_button_1FUOu"
// }
 
class Widget1 extends React.Component {
  render() {
    return (
      <button className={styles.button}>
        Click Me
      </button>
    );
  }
}
export default Widget1;


// ?

// .title {
//   font-weight: bold;
//   font-size: 16px;
// }
 
// .email {
//   padding: .5rem;
// }
 
// .submitButton {
//   padding: .5rem;
//   margin-top: .5rem;
//   border: 1px solid #2F79AD;
//   border-radius: 4px;
//   background-color: #6DB9EE;
// }
 
// .submitButton:hover {
//   background-color: #2F79AD;
// }

import React from 'react';
import styles from './Widget2.css';
// styles == {
//   title: "Widget2_title_1co1k",
//   email: "Widget2_email_3rJVW",
//   submitButton: "Widget2_submitButton_1lMZk"
// }
 
class Widget2 extends React.Component {
  render() {
    return (
      <div>
        <h2 className={styles.title}>
          Email Signup
        </h2>
        <input
          className={styles.email}
          placeholder="Email Please"
          />
        <br/>
        <button
          className={styles.submitButton}
          >
          Submit
        </button>
      </div>
    );
  }
}
export default Widget2;






var LoginForm = React.createClass({
    mixins: [React.addons.LinkedStateMixin],
    
    getInitialState: function(){
        /* мы хотим, чтобы потомок мог изменять состояние родителя, в часности, очищать масив loginActions */
        return { errorCode: 0, errorMessage: '', loginActions: [], defaultLogin: 'admin', defaultPassword: 'password' };
    },

    clearActionList: function() {
          /* для этого  в родителе создаем функцию, которая очищает loginActions */
          this.setState({loginActions: []});
    },
    
    doLogin: function(event) {
        event.preventDefault();
        
        var successLogin = (Math.random() >= 0.5) ? true : false;
        var actions = this.state.loginActions;

        if (!successLogin) {
            actions.push('Login failure');
        
            this.setState({errorCode: 1, errorMessage: 'Error while login.', loginActions: actions});
        }
        else {
            actions.push('Login success');
            
            this.setState({errorCode: 0, errorMessage: '', loginActions: actions});
        }
    },

    render: function() {
        var errorMessage = (this.state.errorCode > 0) ? this.state.errorMessage : '';
        var errorStyle = (this.state.errorCode > 0) ? {display: 'block'} : {display: 'none'};

        return (
            <div>
                <form id="login-form">
                    <div>
                        <input type="text" ref="login" placeholder="login" valueLink={this.linkState('defaultLogin')} />
                        <input type="password" ref="password" placeholder="password" valueLink={this.linkState('defaultPassword')} />
                    </div>
                    <div>
                        <button type="submit" onClick={this.doLogin}>Login</button>
                    </div>
                    <div style={errorStyle}>
                        <span style={{color: '#d9534f'}}> {errorMessage}</span>
                    </div>
                </form>
                
                <div className="actions-list">
                     /* и передаем эту функцию потомку через атрибут, точно так же, как и данные */
                    <ActionsList actions={this.state.loginActions} clearActions={this.clearActionList} />
                </div>
            </div>
        )
    }
});

var ActionsList = React.createClass({

    render: function() {
        return (
            <div>
                /* здесь мы можем изменять состояния родителя, вызывая соответствующую функцию - this.props.clearActions */
                <button onClick={this.props.clearActions}> Clear list </button>
                <ol>
                    {
                        this.props.actions.map(function(action) {
                            return <li>{action}</li>;
                        })                
                    }
                </ol>
            </div>
        )
    }
});

React.render( <LoginForm />, document.getElementById('example'));



var LoginForm = React.createClass({
    /* подключаем примеси */
    mixins: [React.addons.LinkedStateMixin],
    
    getInitialState: function(){
        return { errorCode: 0, errorMessage: '', loginActions: [], defaultLogin: 'admin', defaultPassword: 'password' };
    },

    doLogin: function(event) {
        event.preventDefault();
        
        var successLogin = (Math.random() >= 0.5) ? true : false;
        var actions = this.state.loginActions;

        if (!successLogin) {
            actions.push('Login failure');
        
            this.setState({errorCode: 1, errorMessage: 'Error while login.', loginActions: actions});
        }
        else {
            actions.push('Login success');
            
            this.setState({errorCode: 0, errorMessage: '', loginActions: actions});
        }
    },

    render: function() {
        var errorMessage = (this.state.errorCode > 0) ? this.state.errorMessage : '';
        var errorStyle = (this.state.errorCode > 0) ? {display: 'block'} : {display: 'none'};

        return (
            <div>
                <form id="login-form">
                    <div>
                        /* используем функцию из примеси и спецыальный атрибут valueLink */
                        <input type="text" ref="login" placeholder="login" valueLink={this.linkState('defaultLogin')} />
                        <input type="password" ref="password" placeholder="password" valueLink={this.linkState('defaultPassword')} />
                    </div>
                    <div>
                        <button type="submit" onClick={this.doLogin}>Login</button>
                    </div>
                    <div style={errorStyle}>
                        <span style={{color: '#d9534f'}}> {errorMessage}</span>
                    </div>
                </form>
                
                <div className="actions-list">
                    <ActionsList actions={this.state.loginActions} />
                </div>
            </div>
        )
    }
});

var ActionsList = React.createClass({

    render: function() {
        
        return (
            <ol>
                {
                    this.props.actions.map(function(action) {
                        return <li>{action}</li>;
                    })                
                }
            </ol>
        )
    }
});

React.render( <LoginForm />, document.getElementById('example'));



/** @jsx React.DOM */

// Создаем компонент вызовом React.createClass.

var TimerExample = React.createClass({

    getInitialState: function(){

        // Это выполняется перед функцией render. Возвращаемый объект 
        // присваивается в this.state, чтобы мы могли использовать его позже.

        return { elapsed: 0 };
    },

    componentDidMount: function(){

        // componentDidMount вызывается react'ом, когда компонент 
        // был отрисован на странице. Мы можем установить интервал здесь:

        this.timer = setInterval(this.tick, 50);
    },

    componentWillUnmount: function(){

        // Этот метод вызывается сразу после того, как компонент удален
        // со страницы и уничтожен. Мы можем удалить интервал здесь:

        clearInterval(this.timer);
    },

    tick: function(){

        // Эта функция вызывается каждые 50мс. Она обновляет 
        // счетчик затраченного времени. Вызов setState заставляет компонент перерисовываться

        this.setState({elapsed: new Date() - this.props.start});
    },

    render: function() {
        
        var elapsed = Math.round(this.state.elapsed / 100);

        // Это даст нам число с одной цифрой после запятой dot (xx.x):
        var seconds = (elapsed / 10).toFixed(1);    

        // Хоть мы и возвращаем целый <p> элемент, react разумно обновит
        // только измененные части, содержащие переменную seconds.

        return <p>This example was started <b>{seconds} seconds</b> ago.</p>;
    }
});


React.renderComponent(
    <TimerExample start={Date.now()} />,
    document.body
);





/** @jsx React.DOM */

var MenuExample = React.createClass({

    getInitialState: function(){
        return { focused: 0 };
    },

    clicked: function(index){

        // Обработчик клика обновит состояние
        // изменив индекс на сфокусированный элемент меню

        this.setState({focused: index});
    },

    render: function() {

        // Здесь мы читаем свойство items, которое было передано
        // атрибутом, при создании компонента

        var self = this;

        // Метод map пройдется по массиву элементов меню,
        // и возвратит массив с <li> элементами.

        return (
            <div>
                <ul>{ this.props.items.map(function(m, index){
        
                    var style = '';
        
                    if(self.state.focused == index){
                        style = 'focused';
                    }
        
                    // Обратите внимание на использование метода bind(). Он делает
                    // index доступным в функции clicked:
        
                    return <li className={style} onClick={self.clicked.bind(self, index)}>{m}</li>;
        
                }) }
                        
                </ul>
                
                <p>Selected: {this.props.items[this.state.focused]}</p>
            </div>
        );

    }
});

// Отображаем компонент меню на странице, передав ему массив с элементами

React.renderComponent(
    <MenuExample items={ ['Home', 'Services', 'About', 'Contact us'] } />,
    document.body
);





/** @jsx React.DOM */

// Давайте создадим компонент мгновенного поиска

var SearchExample = React.createClass({

    getInitialState: function(){
        return { searchString: '' };
    },

    handleChange: function(e){

        // Если вы закомментируете данную строку, поле ввода не изменит свое значение.
        // Это потому, что в React'е, поле не может измениться независимо от свойства
        // которое было ему присвоено. В нашем случае, это this.state.searchString.

        this.setState({searchString:e.target.value});
    },

    render: function() {

        var libraries = this.props.items,
            searchString = this.state.searchString.trim().toLowerCase();


        if(searchString.length > 0){

            // Ищем. Фильтрируем резальтаты.

            libraries = libraries.filter(function(l){
                return l.name.toLowerCase().match( searchString );
            });

        }

        return <div>
                    <input type="text" value={this.state.searchString} onChange={this.handleChange} placeholder="Type here" />

                    <ul> 

                        { libraries.map(function(l){
                            return <li>{l.name} <a href={l.url}>{l.url}</a></li>
                        }) }

                    </ul>

                </div>;

    }
});

                                                                                                                                                             
var libraries = [

    { name: 'Backbone.js', url: 'http://documentcloud.github.io/backbone/'},
    { name: 'AngularJS', url: 'https://angularjs.org/'},
    { name: 'jQuery', url: 'http://jquery.com/'},
    { name: 'Prototype', url: 'http://www.prototypejs.org/'},
    { name: 'React', url: 'http://facebook.github.io/react/'},
    { name: 'Ember', url: 'http://emberjs.com/'},
    { name: 'Knockout.js', url: 'http://knockoutjs.com/'},
    { name: 'Dojo', url: 'http://dojotoolkit.org/'},
    { name: 'Mootools', url: 'http://mootools.net/'},
    { name: 'Underscore', url: 'http://documentcloud.github.io/underscore/'},
    { name: 'Lodash', url: 'http://lodash.com/'},
    { name: 'Moment', url: 'http://momentjs.com/'},
    { name: 'Express', url: 'http://expressjs.com/'},
    { name: 'Koa', url: 'http://koajs.com/'},

];

// Отображаем компонент SearchExample на странице

React.renderComponent(
    <SearchExample items={ libraries } />,
    document.body
);




// Это более сложный пример, который использует два компоненты -
// форма выбора сервиса и индивидуальные сервисы внутри.


var ServiceChooser = React.createClass({

    getInitialState: function(){
        return { total: 0 };
    },

    addTotal: function( price ){
        this.setState( { total: this.state.total + price } );
    },

    render: function() {

        var self = this;

        var services = this.props.items.map(function(s){

            // Создадим новый экземпляр компонента Service для каждого элемента массива.
            // Заметьте, что мы передаем функцию self.addTotal function в компонент.

            return <Service name={s.name} price={s.price} active={s.active} addTotal={self.addTotal} />;
        });

        return <div>
                    <h1>Our services</h1>
                    
                    <div id="services">
                        {services}

                        <p id="total">Total <b>${this.state.total.toFixed(2)}</b></p>

                    </div>

                </div>;

    }
});


var Service = React.createClass({

    getInitialState: function(){
        return { active: false };
    },

    clickHandler: function (){

        var active = !this.state.active;

        this.setState({ active: active });
        
        // сообщаем ServiceChooser, вызывая метод addTotal
        this.props.addTotal( active ? this.props.price : -this.props.price );

    },

    render: function(){

        return  <p className={ this.state.active ? 'active' : '' } onClick={this.clickHandler}>
                    {this.props.name} <b>${this.props.price.toFixed(2)}</b>
                </p>;

    }

});


var services = [
    { name: 'Web Development', price: 300 },
    { name: 'Design', price: 400 },
    { name: 'Integration', price: 250 },
    { name: 'Training', price: 220 }
];


// Отображаем ServiceChooser и передаем ему массив сервисов

React.renderComponent(
    <ServiceChooser items={ services } />,
    document.body
);




/** @jsx React.DOM */


// В этом примере мы также имеем два компонента - изображение и список изображений
// Изображения получены из Instagram через AJAX.


var Picture = React.createClass({

    // Этот компонент не содержит никакого состояния - он просто преобразует
    // то что было передано атрибутами в изображение.

    clickHandler: function(){
        
        // Когда компонент кликнут, вызываем обработчик onClick, 
        // который был передан атрибутом при создании:

        this.props.onClick(this.props.ref);
    },

    render: function(){

        var cls = 'picture ' + (this.props.favorite ? 'favorite' : '');

        return (

            <div className={cls} onClick={this.clickHandler}>
                <img src={this.props.src} width="200" title={this.props.title} />
            </div>

        );

    }

});

var PictureList = React.createClass({

    getInitialState: function(){
        
        // Массив изображений будет передан по AJAX, а 
        // избранные когда, пользователь кликнет по изображению:
        
        return { pictures: [], favorites: [] };
    },

    componentDidMount: function(){
        
        // Когда компонент загружается,  отправляем jQuery AJAX запрос

        var self = this;

        // конечная точка API, для загрузки популярных изображений дня

        var url = 'https://api.instagram.com/v1/media/popular?client_id=' + this.props.apiKey + '&callback=?';

        $.getJSON(url, function(result){

            if(!result || !result.data || !result.data.length){
                return;
            }

            var pictures = result.data.map(function(p){

                return { 
                    id: p.id, 
                    url: p.link, 
                    src: p.images.low_resolution.url, 
                    title: p.caption ? p.caption.text : '', 
                    favorite: false 
                };

            });

            // Обновляем состояние компонента. Это вызовет render.
            // Заметьте, что это обновляет только свойство pictures
            // и не удаляет массив избранных.

            self.setState({ pictures: pictures });

        });

    },

    pictureClick: function(id){

        // id содержит ID кликнутого изображения.
        // Найдем в массиве pictures и добавим его в избранные

        var favorites = this.state.favorites,
            pictures = this.state.pictures;

        for(var i = 0; i < pictures.length; i++){

            // Находим айди в массиве изображений

            if(pictures[i].id == id) {                  

                if(pictures[i].favorite){
                    return this.favoriteClick(id);
                }

                // Добавляем изображение в массив избранных,
                // и отмечаем, как избранное:

                favorites.push(pictures[i]);
                pictures[i].favorite = true;

                break;
            }

        }

        // Обновляем состояние, вызывая перерисовку
        this.setState({pictures: pictures, favorites: favorites});

    },

    favoriteClick: function(id){

        // Находим изображение в списке избранных и удалаяем его 
        // После этого находим изображение в массиве всех изображений и отмечаем, как не-избранное.

        var favorites = this.state.favorites,
            pictures = this.state.pictures;


        for(var i = 0; i < favorites.length; i++){
            if(favorites[i].id == id) break;
        }

        // Удаляем из избранных
        favorites.splice(i, 1);


        for(i = 0; i < pictures.length; i++){
            if(pictures[i].id == id) {
                pictures[i].favorite = false;
                break;
            }
        }

        // Обновляем состояние и перерисовываем
        this.setState({pictures: pictures, favorites: favorites});

    },

    render: function() {

        var self = this;

        var pictures = this.state.pictures.map(function(p){
            return <Picture ref={p.id} src={p.src} title={p.title} favorite={p.favorite} onClick={self.pictureClick} />
        });

        if(!pictures.length){
            pictures = <p>Loading images..</p>;
        }

        var favorites = this.state.favorites.map(function(p){
            return <Picture ref={p.id} src={p.src} title={p.title} favorite={true} onClick={self.favoriteClick} />
        });

        if(!favorites.length){
            favorites = <p>Click an image to mark it as a favorite.</p>;
        }

        return (

            <div>
                <h1>Popular Instagram pics</h1>
                <div className="pictures"> {pictures} </div>
                    
                <h1>Your favorites</h1>
                <div className="favorites"> {favorites} </div>
            </div>

        );
    }
});


// Отрисовываем компонент PictureList и добавлем его в body.
// я использую API ключ для тестового Instagram приложения.  
// Пожалуйста, сгенерируйте и используйте свой собственный здесь http://instagram.com/developer/

React.renderComponent(
    <PictureList apiKey="642176ece1e7445e99244cec26f4de1f" />,
    document.body
);