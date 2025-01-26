import { useState } from "react";
import "./App.css";

function App() {
  const [valorCriptografar, setValorCriptografar] = useState("");
  const handleValorCriptografarChange = (e) => {
    setValorCriptografar(e.target.value);
  };

  const [valorDescriptografar, setValorDescriptografar] = useState("");
  const handleValorDescriptografarChange = (e) => {
    setValorDescriptografar(e.target.value);
  };

  const [valorChave, setValorChave] = useState();
  const handleValorChaveChange = (e) => {
    setValorChave(e.target.value);
  };

  const letras = "abcdefghijklmnopqrstuvwxyz";

  const criptografar = (texto_input, chave_index) => {
    let texto_output = "";
    chave_index = Number(chave_index);

    for (let letra in texto_input) {
      // tentei com letra = letra.toLowerCase(), mas usando o for in assim, retornava o index crescente 0,1,2... porque estava percorrendo a string, tive que usar dessa forma debaixo, texto_input[letra], aparentemente o for in retorna o index e não o conteúdo da string em si
      letra = texto_input[letra].toLowerCase();
      const index = letras.indexOf(letra);
      if (index == -1) {
        texto_output += letra;
      } else {
        let novo_index = index + chave_index;
        if (novo_index >= 26) {
          novo_index -= 26;
        }
        texto_output += letras[novo_index];
      }
    }

    return setValorDescriptografar(texto_output);
  };

  const descriptografar = (texto_input, chave_index) => {
    let texto_output = "";
    chave_index = Number(chave_index);

    for (let letra in texto_input) {
      letra = texto_input[letra].toLowerCase();

      const index = letras.indexOf(letra);
      if (index == -1) {
        texto_output += letra;
      } else {
        let novo_index = index - chave_index;
        if (novo_index < 0) {
          novo_index += 26;
        }
        texto_output += letras[novo_index];
      }
    }
    return setValorCriptografar(texto_output);
  };

  return (
    <div id="body">
      <header>
        <h1>Cifra de Cesar</h1>
        <div id="textExplanation">
          <p>
            É uma técnica de criptografia onde cada letra de um texto é
            substituída por outra, que se encontra no alfabeto após a primeira
            letra em um número definido de vezes, esse número é conhecido como
            Chave. Por exemplo, em uma troca simples com uma chave 5, a letra A
            (posição 1) seria substituída pela letra F (posição 6), a letra B
            (posição 2) se tornaria G (posição 7), e assim por diante.
            <br />
            Apesar do nome, é sabido que cifras de substituição simples já eram
            usadas bem antes de Júlio César, apesar do nome dessa cifra ser em
            homenagem ao líder romano, pois ele a usava para trocar mensagens
            militares com seus generais
          </p>
        </div>
      </header>
      <div id="chave">
        <label htmlFor="inputChave">Chave (entre 1 e 26): </label>
        <input
          type="number"
          id="inputChave"
          min={1}
          max={26}
          onChange={handleValorChaveChange}
        />
      </div>

      <main>
        <div id="criptografar">
          <h3 id="title">Criptografar</h3>
          <textarea
            value={valorCriptografar}
            onChange={handleValorCriptografarChange}
            cols="30"
            rows="10"
          ></textarea>
          <div id="divbuttons">
            <button
              type="submit"
              id="button"
              onClick={() => {
                if (
                  valorChave < 1 ||
                  valorChave > 26 ||
                  valorChave == undefined
                ) {
                  alert("Por favor, insira um valor de chave entre 1 e 26");
                } else {
                  criptografar(valorCriptografar, valorChave);
                }
              }}
              disabled={valorCriptografar == ""}
            >
              Ok
            </button>
          </div>
        </div>

        <div id="descriptografar">
          <h3 id="title">Descriptografar</h3>

          <textarea
            value={valorDescriptografar}
            onChange={handleValorDescriptografarChange}
            cols="30"
            rows="10"
          ></textarea>
          <div id="divbuttons">
            <button
              type="submit"
              id="button"
              onClick={() => {
                if (
                  valorChave < 1 ||
                  valorChave > 26 ||
                  valorChave == undefined
                ) {
                  alert("Por favor, insira um valor de chave entre 1 e 26");
                } else {
                  descriptografar(valorDescriptografar, valorChave);
                }
              }}
              disabled={valorDescriptografar == ""}
            >
              Ok
            </button>
          </div>
        </div>
      </main>

      <footer>
        <img
          src={require("./github-mark.png")}
          alt=""
          width={50}
          height={50}
          onClick={() => {
            window.open("https://github.com/techtalia");
          }}
        />
        <img
          src={require("./linkedin-logo.png")}
          alt=""
          width={50}
          height={50}
          onClick={() => {
            window.open("https://linkedin.com/in/techtalia/");
          }}
        />
      </footer>
    </div>
  );
}

export default App;
