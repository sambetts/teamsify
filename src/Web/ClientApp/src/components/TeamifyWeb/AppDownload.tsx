import React from 'react';
import { AppDetails } from '../models/WizardModels';

import { WizardButtons } from '../WizardButtons';
import { Button } from '@mui/material';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { NavLink } from 'react-router-dom';

interface Props {
  sessionId: string,
  details: AppDetails,
  url: string,
  startOver: Function,
  goBack: Function
}
export const AppDownload: React.FC<Props> = (props) => {
  const [downloadRedirectUrl, setDownloadRedirectUrl] = React.useState<string | null>();

  const downloadApp = () => {
    console.log(JSON.stringify(props.details));

    fetch("/api/TeamsApp/CreateApp?url=" + props.url + "&sessionId=" + props.sessionId,
      {
        mode: 'cors',
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(props.details)
      })
      .then(res => {
        res.text().then(body => {
          if (!res.ok) {
            handleError();
          }
          else {
            // Response is a URL back to our service which will generate a redirect to blob storage if GET-ed
            const downloadUrl: string = `/api/TeamsApp/DownloadApp?fileUrl=${body}&sessionId=${props.sessionId}`;
            setDownloadRedirectUrl(downloadUrl);
          }

        })
      })
      .catch(err => handleError());
  }

  const handleError = () => {
    alert('Got an error loading the package. Check JavaScript console for more info.');
  }

  return (
    <div>
      <h3>Teams App Ready!</h3>
      <p>Your website has been turned into Teams app '{props.details.shortName}', and is ready to download and deploy to your Teams.</p>

      <div>
        <svg role="presentation" focusable="false" viewBox="2 2 16 16" style={{ height: 40 }}>
          <path d="M4.5 17.0009C3.7203 17.0009 3.07955 16.406 3.00687 15.6454L3 15.5009V4.50092C3 3.72122 3.59489 3.08047 4.35554 3.00778L4.5 3.00092H9C9.7797 3.00092 10.4204 3.5958 10.4931 4.35646L10.5 4.50092V4.75534L12.6886 2.48609C13.2276 1.92691 14.0959 1.8766 14.6956 2.34798L14.8118 2.44922L17.5694 5.17386C18.1219 5.71976 18.1614 6.5886 17.68 7.18505L17.5767 7.30053L15.266 9.50034L15.5 9.50092C16.2797 9.50092 16.9204 10.0958 16.9931 10.8565L17 11.0009V15.5009C17 16.2806 16.4051 16.9214 15.6445 16.994L15.5 17.0009H4.5ZM9.5 10.5009H4V15.5009C4 15.7157 4.13542 15.8988 4.32553 15.9696L4.41012 15.9929L4.5 16.0009H9.5V10.5009ZM15.5 10.5009H10.5V16.0009H15.5C15.7455 16.0009 15.9496 15.824 15.9919 15.5908L16 15.5009V11.0009C16 10.7555 15.8231 10.5513 15.5899 10.509L15.5 10.5009ZM10.5 7.71034V9.50034H12.29L10.5 7.71034ZM9 4.00092H4.5C4.25454 4.00092 4.05039 4.17779 4.00806 4.41104L4 4.50092V9.50092H9.5V4.50092C9.5 4.28614 9.36458 4.10299 9.17447 4.0322L9.08988 4.00897L9 4.00092ZM14.1222 3.17357C13.9396 2.99744 13.6692 2.98247 13.4768 3.12096L13.4086 3.18007L10.7926 5.89421C10.6271 6.06592 10.6086 6.32593 10.7356 6.51736L10.799 6.59475L13.4147 9.21046C13.5826 9.37838 13.8409 9.40226 14.0345 9.28022L14.1131 9.21898L16.8708 6.59231C17.0433 6.4177 17.061 6.14817 16.9248 5.95411L16.8665 5.88521L14.1222 3.17357Z"></path>
          <path d="M4.5 17.0009C3.7203 17.0009 3.07955 16.406 3.00687 15.6454L3 15.5009V4.50092C3 3.72122 3.59489 3.08047 4.35554 3.00778L4.5 3.00092H9C9.7797 3.00092 10.4204 3.5958 10.4931 4.35646L10.5 4.50092V4.75534L12.6886 2.48609C13.2276 1.92691 14.0959 1.8766 14.6956 2.34798L14.8118 2.44922L17.5694 5.17386C18.1219 5.71976 18.1614 6.5886 17.68 7.18505L17.5767 7.30053L15.266 9.50034L15.5 9.50092C16.2797 9.50092 16.9204 10.0958 16.9931 10.8565L17 11.0009V15.5009C17 16.2806 16.4051 16.9214 15.6445 16.994L15.5 17.0009H4.5ZM9.5 10.5009H4V15.5009C4 15.7157 4.13542 15.8988 4.32553 15.9696L4.41012 15.9929L4.5 16.0009H9.5V10.5009ZM15.5 10.5009H10.5V16.0009H15.5C15.7455 16.0009 15.9496 15.824 15.9919 15.5908L16 15.5009V11.0009C16 10.7555 15.8231 10.5513 15.5899 10.509L15.5 10.5009ZM10.5 7.71034V9.50034H12.29L10.5 7.71034ZM9 4.00092H4.5C4.25454 4.00092 4.05039 4.17779 4.00806 4.41104L4 4.50092V9.50092H9.5V4.50092C9.5 4.28614 9.36458 4.10299 9.17447 4.0322L9.08988 4.00897L9 4.00092Z"></path>
        </svg>
      </div>

      <Button type="submit" variant="contained" size="large" onClick={() => downloadApp()}
        style={{ marginTop: 20, marginBottom: 50 }} endIcon={<FileDownloadOutlinedIcon />}>Download Teams App Zip</Button>

      <p>You just need to deploy it to Teams - <NavLink to='/DeployGuide'>here's how to deploy to your organisation</NavLink>, or you can upload just for you too.</p>
      <p>You can side-load the app, or if you have the right permissions, deploy to entire group(s) of users.</p>

      <img src='imgs/Upload.jpg' alt='Add app to setup policy' />

      {downloadRedirectUrl &&
        <>
          <iframe src={downloadRedirectUrl} className='Hidden' title='Redirect' />
        </>
      }

      <WizardButtons nextClicked={() => props.startOver()} nextText="Start Over"
        previousText="Back" previousClicked={() => props.goBack()} />
    </div>
  );
};
