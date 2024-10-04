import React, { useState } from "react";
// import "./App.css";
import classNames from "classnames";
import usersFromServer from "../api/users.json";
import { Post } from "../types/Post";
import { getUserById } from "../services/user";

type Props = {
  onSubmit: (post: Post) => void;
};
export const PostForm: React.FC<Props> = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [hasTitleError, setHasTitleError] = useState(false);

  const [userId, setUserId] = useState(0);
  const [hasUserIdError, setHasUserIdError] = useState(false);

  const [isAgreed, setIsAgreed] = useState(false);

  const [body, setBody] = useState("");
  const [bodyErrorMesage, setBodyErrorMesage] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    setHasTitleError(!title);
    setHasUserIdError(!userId);

    if (!body) {
      setBodyErrorMesage("Please enter some text");
    } else if (body.length < 5) {
      setBodyErrorMesage("Body should has at least 5 charachters");
      return;
    }

    if (!title || !userId || body.length < 5) {
      return;
    }

    onSubmit({
      id: 0,
      title,
      userId,
      body,
      user: getUserById(userId),
    });

    reset();
  };

  const reset = () => {
    setTitle("");
    setUserId(0);
    setBody("");

    setHasTitleError(false);
    setHasUserIdError(false);
    setBodyErrorMesage("");
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    setHasTitleError(false);
  };

  const handleUserIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUserId(+event.target.value);
    setHasUserIdError(false);
  };

  const handleBodyChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBody(event.target.value);
    setBodyErrorMesage("");
  };

  return (
    <form
      action="/api/posts"
      method="POST"
      className="box"
      onSubmit={handleSubmit}
      onReset={reset}
    >
      <div className="field">
        <label className="label" htmlFor="post-title">
          Title
        </label>
        <div className="control has-icons-right">
          <input
            id="post-title"
            className={classNames("input", {
              "is-danger": hasTitleError,
            })}
            type="text"
            placeholder="Text input"
            value={title}
            onChange={handleTitleChange}
            onBlur={() => {
              setHasTitleError(!title);
            }}
          />

          {hasTitleError && (
            <span className="icon is-small is-right">
              <i className="fa fa-exclamation-triangle" aria-hidden="true"></i>
            </span>
          )}

          {hasTitleError && <p className="help is-danger">Title is required</p>}
        </div>
      </div>

      <div className="field">
        <label className="label">User</label>
        <div className="control has-icons-left">
          <div
            className={classNames("select", {
              "is-danger": hasUserIdError,
            })}
          >
            <select
              id="user-id"
              value={userId}
              onChange={handleUserIdChange}
              onBlur={() => {
                setHasUserIdError(!userId);
              }}
            >
              <option value="0">Select user</option>
              {usersFromServer.map((user) => (
                <option value={user.id} key={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          </div>
          <span className="icon is-small is-left">
            <i className="fa fa-user" aria-hidden="true"></i>
          </span>
          {hasUserIdError && <p className="help is-danger">Select a user</p>}
        </div>
      </div>

      <div className="field">
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
      </div>

      {/* {isBodyShown && <textarea name="" id="" className="field"></textarea>} */}
      {isAgreed && (
        <div className="field">
          <label className="label">Post text</label>
          <div className="control">
            <textarea
              className={classNames("textarea", {
                "is-danger": bodyErrorMesage,
              })}
              placeholder="Textarea"
              onChange={handleBodyChange}
              onBlur={() => {
                if (!body) {
                  setBodyErrorMesage("Please enter some text");
                } else if (body.length < 5) {
                  setBodyErrorMesage("Body should have at least 5 characters");
                } else {
                  setBodyErrorMesage("");
                }
              }}
            ></textarea>
            {bodyErrorMesage && (
              <p className="help is-danger">{bodyErrorMesage}</p>
            )}
          </div>
        </div>
      )}

      <div className="buttons">
        <button type="submit" className="button is-primary">
          Submit
        </button>

        <button type="reset" className="button is-link is-light ">
          Cancel
        </button>
      </div>
    </form>
  );
};
