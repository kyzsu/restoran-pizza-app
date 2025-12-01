import { Component } from "react";
import { Link } from "@tanstack/react-router";

class ErrorBoundary extends Component {
  // state / useState => hasError: false
  state = { hasError: false };

  // semisal terjadi error, getDerivedState akan mengubah hasError: true.
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  // jika componentnya menangkap error, dia akan console sebuah error message.
  componentDidCatch(error, info) {
    console.error("Error Boundary telah menangkap sebuah error!", error, info);
  }

  // render => menampilkan
  render() {
    // jika state dari prop hasError bernilai true, dia akan mengembalikan html ini.
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Telah terjadi kesalahan pada web!</h2>
          <p>
            Ada sebuah error pada list ini! Silahkan kembali ke{" "}
            <Link to="/">Home page</Link>.
          </p>
        </div>
      );
    }

    // kalau ga ada error, kembalikan childrennya saja.
    return this.props.children;
  }
}

export default ErrorBoundary;
