import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import './index.css';
import { RouteView } from 'virtual:next-react-router';

ReactDOM.render(<RouteView />, document.getElementById('root'));
