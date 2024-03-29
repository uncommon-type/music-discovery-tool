import React from "react";

import TopTrackPlayer from "./TopTrackPlayer";

const TopTracksList = ({ tracks }) => {
  const headers = ["track", "popularity"];
  return (
    <article className="tracks-infogroup flow radius bg-primary color-light">
      <h3 className="color-secondary-shade text-400 weight-medium">
        Top Tracks
      </h3>
      <table>
        <thead>
          <tr>
            {headers.map((header, i) => (
              <th scope="col" key={i}>
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {tracks.map((track) => {
            return (
              <tr key={track.id}>
                <th scope="row">
                  <div className="cluster">
                    <div className="intermediary-wrapper">
                      <p className="intermediary-wrapper__track">
                        {track.name}
                      </p>
                      <p className="intermediary-wrapper__album font-size:1">
                        <strong>{track.album.name}</strong>
                      </p>
                    </div>
                  </div>

                  {track.preview_url ? <TopTrackPlayer track={track} /> : null}
                </th>
                <td>
                  <span>{track.popularity}</span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </article>
  );
};

export default TopTracksList;
