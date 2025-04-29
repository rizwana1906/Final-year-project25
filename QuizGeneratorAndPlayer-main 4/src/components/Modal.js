import React from 'react';


const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>X</button>
        <h2 className='desc_head'>Bloom’s Taxonomy</h2>
        <img src="https://www.researchgate.net/publication/322279608/figure/fig1/AS:11431281124316061@1677906509480/Blooms-Taxonomy-is-traditionally-shown-in-a-pyramid-with-lower-cognitive-levels-at-the.png" alt="Description of the image" className="modal-image" />
        <ol className="modal-list">
          <li>
            <strong>Knowledge:</strong> recalling information or knowledge is the foundation of the pyramid and a precondition for all future levels.
            <br />
            <em>Example:</em> Name three common types of meat.
          </li>
          <li>
            <strong>Comprehension:</strong> making sense out of information
            <br />
            <em>Example:</em> Summarize the defining characteristics of steak, pork, and chicken.
          </li>
          <li>
            <strong>Application:</strong> using knowledge in a new but similar form
            <br />
            <em>Example:</em> Does eating meat help improve longevity?
          </li>
          <li>
            <strong>Analysis:</strong> taking knowledge apart and exploring relationships
            <br />
            <em>Example:</em> Compare and contrast the different ways of serving meat and compare health benefits.
          </li>
          <li>
            <strong>Synthesis:</strong> using information to create something new
            <br />
            <em>Example:</em> Convert an "unhealthy" recipe for meat into a "healthy" recipe by replacing certain ingredients. Argue for the health benefits of using the ingredients you chose as opposed to the original ones.
          </li>
          <li>
            <strong>Evaluation:</strong> critically examining relevant and available information to make judgments
            <br />
            <em>Example:</em> Which kinds of meat are best for making a healthy meal and why?
          </li>
        </ol>
      </div>
    </div>
  );
};

export default Modal;
