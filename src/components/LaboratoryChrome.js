import React from 'react';
import {connect} from 'react-redux';
import classNames from 'classnames';
import NetworkPicker from './NetworkPicker';
import EndpointExplorer from './EndpointExplorer';
import TransactionBuilder from './TransactionBuilder';
import TransactionSigner from './TransactionSigner';
import {RouterListener} from '../utilities/simpleRouter';
import SLUG from '../constants/slug';

function LaboratoryChrome(props) {
  let tabItem = (name, slug) => {
    return <a
      href={'#' + slug}
      className={classNames(
        'buttonList__item s-button s-button--min',
        {'is-active': props.routing.location === slug})}
      key={slug}>
      {name}
    </a>
  }

  return <div>
    <div className="so-back">
      <div className="so-chunk">
        <div className="so-siteHeader LaboratoryChrome__header">
          <span className="so-logo">
            <a href="https://www.stellar.org/" className="so-logo__main">Stellar</a>
            <span className="so-logo__separator"> </span>
            <a href="https://www.stellar.org/laboratory/" className="so-logo__subSite">laboratory</a>
          </span>
          <NetworkPicker />
        </div>
      </div>
    </div>
    <div className="so-back LaboratoryChrome__siteNavBack">
      <div className="so-chunk">
        <nav className="s-buttonList">
          {tabItem('Endpoint Explorer', SLUG.EXPLORER)}
          {tabItem('Transaction Builder', SLUG.TXBUILDER)}
          {tabItem('Transaction Signer', SLUG.TXSIGNER)}
        </nav>
      </div>
    </div>

    {getContent(props.routing.location)}
    <RouterListener />
  </div>;
}

function getContent(slug) {
  switch (slug) {
    case SLUG.HOME:
      return <SimplePage><p>To begin, select a tool from above.</p></SimplePage>
    case SLUG.EXPLORER:
      return <EndpointExplorer />;
    case SLUG.TXBUILDER:
      return <TransactionBuilder />;
    case SLUG.TXSIGNER:
      return <TransactionSigner />;
    default:
      return <SimplePage><p>Page "{slug}" not found</p></SimplePage>
  }
}

function SimplePage(props) {
  return <div className="so-back SimplePage__back">
    <div className="so-chunk">
      {props.children}
    </div>
  </div>
}

export default connect(chooseState)(LaboratoryChrome);
function chooseState(state) {
  return {
    routing: state.routing
  }
}
