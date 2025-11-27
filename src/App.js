const Pizza = (props) => {
  return React.createElement("div", {}, [
    React.createElement("h1", {}, props.name),
    React.createElement("p", {}, props.description),
  ]);
};

// const app -> arrow function yang akan menghasilkan element React.
// createElement memerlukan tiga parameter:
// 1. element HTML
// 2. adalah property/attribute element tersebut
// 3. children.
const App = () => {
  return React.createElement("div", {}, [
    React.createElement("h1", {}, "Pizza terbaik se-indonesia!"),
    React.createElement(Pizza, {
      name: "Pepperoni Pizza",
      description: "Pepperoni dan Keju",
    }),
    React.createElement(Pizza, {
      name: "Meatlovers",
      description: "daging sapi, ayam, babi semuanya",
    }),
  ]);
};

// 15-17 digunakan untuk menampilkan element/variable App diatas, kedalam div id root
const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(React.createElement(App));
