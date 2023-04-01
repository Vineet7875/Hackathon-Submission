import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./SubForm.css";

function SubForm({ onSubmit }) {

    const location = useLocation();
    const submission = location.state?.submission ?? {};

    const [title, setTitle] = useState(submission.title ?? "");
    const [summary, setSummary] = useState(submission.summary ?? "");
    const [description, setDescription] = useState(submission.description ?? "");
    const [characterCount, setCharacterCount] = useState(0);
    const [img, setImg] = useState(submission.img ?? "");
    const [startdate, setStartDate] = useState(submission.startdate ?? "")
    const [enddate, setEndDate] = useState(submission.enddate ?? "")
    const [gitlink, setGitLink] = useState(submission.gitlink ?? "");
    const [linklink, setLinkLink] = useState(submission.gitlink ?? "");
    const navigate = useNavigate();

    function handleDescriptionChange(event) {
        setDescription(event.target.value);
        setCharacterCount(event.target.value.length);
    }

    function handleImgChange(event) {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            const img = new Image();
            img.src = imageUrl;
            img.onload = function () {
                if (img.width < 360 || img.height < 360) {
                    alert("Please upload an image with a minimum size of 360px X 360px.");
                    setImg("");
                } else {
                    setImg(imageUrl);
                }
            };
        }
    }

    function handleSubmit(event) {
        event.preventDefault();
        const submission = { title, summary, description, img, gitlink, linklink, startdate, enddate };
        onSubmit && onSubmit(submission);
        setTitle("");
        setSummary("");
        setDescription("");
        setCharacterCount(0);
        setImg("");
        setStartDate("");
        setEndDate("");
        setGitLink("");
        setLinkLink("")
        navigate("/")
    }


    return (
        <div className="sub-form-container">
            <h2>New Hackathon Submission</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        placeholder="Title of your submission"
                        type="text"
                        id="title"
                        name="title"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="summary">Summary</label>
                    <input
                        placeholder="A short summary of your submission (this will be visible with your submission)"
                        type="text"
                        id="summary"
                        name="summary"
                        value={summary}
                        onChange={(event) => setSummary(event.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea
                        placeholder="Write a long description of your project. You can describe your idea and approach here."
                        id="description"
                        name="description"
                        value={description}
                        onChange={handleDescriptionChange}
                        required
                    />
                    <div className="char-count">{characterCount}/3,000 characters</div>
                </div>
                <div className="form-group">
                    <label htmlFor="cover-image">Cover Image</label>
                    <p>Minimum resolution: 360px X 360px</p>
                    <input type="file" id="cover-image" name="cover-image" accept="image/*" onChange={handleImgChange} required />
                    {img && (
                        <img src={img} alt="cover" style={{ marginTop: "10px", width: '4rem' }} />
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="hackathon-name">Hackathon Name</label>
                    <input placeholder="Enter the name of the hackathon" type="text" id="hackathon-name" name="hackathon-name" required />
                </div>
                <div className="form-group">
                    <div className="Date">
                        <div className="startDate">
                            <label htmlFor="start-date">Hackathon Start Date</label>
                            <input type="date" id="start-date" name="start-date" value={startdate} onChange={(event) => setStartDate(event.target.value)} required />
                        </div>
                        <div className="endDate">
                            <label htmlFor="end-date">Hackathon End Date</label>
                            <input type="date" id="end-date" name="end-date" value={enddate} onChange={(event) => setEndDate(event.target.value)} required />
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="github-repo">GitHub Repository</label>
                    <input placeholder="Enter your submission's public Github repository link" type="text" id="github-repo" name="github-repo" value={gitlink} onChange={(event) => setGitLink(event.target.value)} required />

                </div>
                <div className="form-group">
                    <label htmlFor="other-links">Other Links</label>
                    <input placeholder="You can upload a video demo or URL of you demo app here." type="text" id="other-links" name="other-links" value={linklink} onChange={(event) => setLinkLink(event.target.value)} />
                </div>
                <button type="submit">Upload Submission</button>
            </form>
        </div>
    );
}
export default SubForm;
