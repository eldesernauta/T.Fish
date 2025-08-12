import React, { Component } from 'react';
import FsLightbox from 'fslightbox-react';
import './App.scss'
import './fonts.scss'
import inner_1 from './assets/inner_1.jpg'
import inner_3 from './assets/inner_3.jpg'
import inner_4 from './assets/inner_4.jpg'
import photo_2 from './assets/photo_2.jpg'


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      lightboxController: {
        toggler: false,
        slide: 1
      },
      key: 0
    };

    this.openLightboxOnSlide = this.openLightboxOnSlide.bind(this);
    this.remountLightbox = this.remountLightbox.bind(this);
  }

  openLightboxOnSlide(number) {
    this.setState({
      lightboxController: {
        toggler: !this.state.lightboxController.toggler,
        slide: number
      }
    });
  }

  remountLightbox() {
    this.setState({
      key: this.state.key + 1
    });
  }

  render() {
    return (
      <div className="App" >
        <div className="banner">
          <h1>T . F i s h</h1>
          <h4>Sobre un 4 de abril</h4>
          <ul className='social-media'>
            <li><a href='https://ph.eldesernauta.com' target='_blank' rel='noreferrer'><i className='fa fa-film'></i></a></li>
            <li><a href='https://eldesernauta.com' target='_blank' rel='noreferrer'><i className='fa fa-globe'></i></a></li>
            <li><a href='https://linktr.ee/eldesernauta' target='_blank' rel='noreferrer'><i className='fa fa-link'></i></a></li>
            <li><a href='https://instagram.com/eldesernauta' target='_blank' rel='noreferrer'><i className='fa fa-instagram'></i></a></li>
          </ul>
        </div>
        <div className='wrapper'>
          <article className='folder'>
            <h2 className='folder-title'>Momento I</h2>
            <div className='content'>
              <h3>Momento I</h3>
              <div className="gallery">
                <div className="inner">
                  <p>Hago largos viajes por carretera cumpliendo mi condena de ser nauta, uno que además de navegar este desierto que se lleva por vida, surque también el espacio interior vasto que cabe en cada compañía, en momentos perennes o en lugares donde morir logre parecer una experiencia celestial.
                  </p>
                  <img className='thumbnail' src={inner_1} alt='front portrait' onClick={() => this.openLightboxOnSlide(1)} />

                </div>
              </div>
            </div>
          </article>
          <article className='folder'>
            <h2 className='folder-title'>Momento II</h2>
            <div className='content'>
              <h3>Momento II</h3>

              <div className="gallery">
                <div className="inner">
                  <img className='thumbnail' src={photo_2} alt='right portrait' onClick={() => this.openLightboxOnSlide(2)} />

                  <p>Hago largos viajes a través de la meditación para visitar lugares que me enseñen a apreciar las cosas que no puedo dominar. Ayer, desde la distancia, visité su océano lleno de flores: por fin conocí el mar y, por voluntad propia, escogí el naufragio y las espinas.
                  </p>

                </div>
              </div>
            </div>
          </article>
          <article className='folder'>
            <h2 className='folder-title'>Momento III</h2>
            <div className='content'>
              <h3>Momento III</h3>

              <div className="gallery">
                <div className="inner">
                  <p>Bienaventurado el náufrago que, una vez entendió que cada centímetro cúbico en millas a su alrededor podían significar su fin, se encontró derrotado, cerró los ojos para contemplar y adoptó la calma.
                  </p>
                  <img className='thumbnail' src={inner_3} alt='left portrait' onClick={() => this.openLightboxOnSlide(3)} />
                </div>
              </div>
            </div>
          </article>
          <article className='folder'>
            <h2 className='folder-title'>Momento IV</h2>
            <div className='content'>
              <h3>Momento IV</h3>

              <div className="gallery">
                <div className="inner">
                  <p>Hago largos viajes por su mar y prefiero hundirme.
                  </p>
                  <img className='thumbnail' src={inner_4} alt='back portrait' onClick={() => this.openLightboxOnSlide(4)} />

                </div>
              </div>
            </div>
          </article>
          <FsLightbox
            toggler={this.state.lightboxController.toggler}
            sources={[
              <img src={inner_1} alt='front portrait' />,
              <img src={photo_2} alt='right portrait' />,
              <img src={inner_3} alt='right portrait' />,
              <img src={inner_4} alt='back portrait' />
            ]}
            customAttributes={[
              {
                srcSet: './assets/inner_1.jpg, ./assets/photo_2.jpg, , ./assets/inner_3.jpg, ./assets/inner_4.jpg',
                sizes: '(max-width: 600px) 600px, 1200px'
              }
            ]}
            slide={this.state.lightboxController.slide}
            disableLocalStorage={true}
            loadOnlyCurrentSource={true}
            key={this.state.key}
          />
        </div>
      </div>

    );
  }
}

export default App;
