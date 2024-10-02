import React, { useState } from "react";

export const PostForm: React.FC = () => {
  // const [userId, setUserId] = useState(0);
  // const [title, setTitle] = useState("Post 1");
  // const [body, setBody] = useState(true);
  const [isAgreed, setIsAgreed] = useState(false);

  return (
    <form action="/api/posts" method="POST" className="box">
      <div className="field">
        <label className="label" htmlFor="post-title">
          Title
        </label>
        <div className="control  has-icons-right">
          <input
            id="post-title"
            className="input"
            type="text"
            placeholder="Text input"
          />
          <span className="icon is-small is-right">
            <i className="fa fa-exclamation-triangle" aria-hidden="true"></i>
          </span>
        </div>
      </div>
      <div className="field">
        <label className="label">Your email</label>
        <div className="control has-icons-right">
          <input
            className="input"
            type="email"
            placeholder="youremail@gmail.com"
          />
          <span className="icon is-small is-right">
            <i className="fa fa-envelope" aria-hidden="true"></i>
          </span>
        </div>
      </div>

      <div className="field">
        <label className="label">Type of post</label>
        <div className="control has-icons-left">
          <div className="select">
            <select name="" id="topic-id">
              <option value="0">Select type, pls</option>
              <option value="1">History</option>
              <option value="2">Personal blogue</option>
              <option value="3">Science</option>
              <option value="4">News</option>
            </select>
          </div>
          <span className="icon is-small is-left">
            <i className="fa fa-leaf" aria-hidden="true"></i>
          </span>
        </div>
      </div>

      <label htmlFor="" className="field">
        <input
          type="checkbox"
          checked={isAgreed}
          onChange={(event) => setIsAgreed(event.target.checked)}
          // checked={isBodyShown}
          // onChange={(event) => setIsBodyShown(event.target.checked)}
        />
        I agree with terms and policy
      </label>

      {/* {isBodyShown && <textarea name="" id="" className="field"></textarea>} */}
      {isAgreed && (
        <div className="field">
          <label className="label">Post text</label>
          <div className="control">
            <textarea className="textarea" placeholder="Textarea"></textarea>
          </div>
        </div>
      )}

      <button className="button is-primary" type="submit">
        Post
      </button>
    </form>
  );
};
