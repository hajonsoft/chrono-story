import React from "react";

import hero from "@/assets/hero_alternative_2.jpeg";
import {
  Box,
  Button,
  Grid,
  Link,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

const cards = [
  {
    title: "Study Quranic Verses",
    media:
      "https://firebasestorage.googleapis.com/v0/b/chrono-story.appspot.com/o/assets%2Fstudy.jpeg?alt=media&token=4eff0e04-0ddf-4d95-876d-932fa74d2257",
    description:
      "Search for any verse by reference and start exploring its meanings and connections.",
  },
  {
    title: "Create Timelines",
    media:
      "https://firebasestorage.googleapis.com/v0/b/chrono-story.appspot.com/o/assets%2Ftimeline.jpeg?alt=media&token=13c8e20e-b458-4729-b82b-e87e4b23798d",
    description:
      "Organize your thoughts by creating a timeline and/or linking prophets to ancient history.",
  },
  {
    title: "Explore Ancient History",
    media:
      "https://firebasestorage.googleapis.com/v0/b/chrono-story.appspot.com/o/assets%2Fexplore.jpeg?alt=media&token=658321ed-f574-4453-b8f6-364ba1e02cf1",
    description:
      "Discover the connections between Quranic verses and history, ex. Thothmoses III vs Solomon.",
  },
];

const projects = [
  {
    title: "Ancient History and Prophets",
    description:
      "Explore the connections between ancient history and prophets.",
    link: "#",
  },
  {
    title: "Quranic Verses and Science",
    description: "Discover the scientific facts mentioned in Quranic verses.",
    link: "#",
  },
  {
    title: "Prophets and Miracles",
    description: "Learn about the miracles performed by prophets.",
    link: "#",
  },
  {
    title: "Quranic Verses and Morality",
    description: "Understand the moral teachings in Quranic verses.",
    link: "#",
  },
  {
    title: "Prophets and Their Teachings",
    description: "Study the teachings of different prophets.",
    link: "#",
  },
];
const Information = () => {
  const [email, setEmail] = React.useState("");
  return (
    <Box sx={{ marginTop: "4px", width: "100%" }}>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          gap: "32px",
        }}
      >
        <img
          src={hero}
          alt="ad"
          style={{
            width: "40%",
            height: "80%",
          }}
        />
        <Box>
          <Typography
            variant="h3"
            sx={{
              color: "hsl(356,100%,40%)",
              marginTop: "64px",
              marginBottom: "64px",
              fontFamily: "Cormorant Garamond",
            }}
            align="left"
          >
            Explore Quranic Verses and Create Meaningful Timelines
          </Typography>

          <Typography
            variant="h4"
            align="left"
            gutterBottom
            sx={{
              color: "hsl(356,100%,40%)",
              fontFamily: "Cormorant Garamond",
              textDecoration: "underline",
            }}
          >
            Quranic Timeline Journey
          </Typography>

          <Typography
            align="left"
            variant="subtitle1"
            sx={{
              color: "hsl(356,100%,40%)",
              fontFamily: "Cormorant Garamond",
              fontWeight: "bold",
            }}
          >
            Welcome to Quranic Verse with Timeline, a specialized platform that
            allows users to delve into Quranic verses, list events
            chronologically, and enable note-taking with images and Quranic
            references. Our platform, primarily targeting researchers and
            academics, aims to incorporate the Quran and facilitate
            chronological note-editing. Be inspired as you explore the
            connection between Quranic stories and ancient Egyptian history.
          </Typography>
        </Box>
      </Box>
      <Box
        sx={{
          backgroundColor: "#D0000E",
          padding: "32px",
        }}
      >
        <Grid container spacing={4}>
          {cards.map((card, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <Paper
                elevation={5}
                sx={{
                  padding: "16px",
                  backgroundColor: "hsl(356,50%,99%)",
                }}
              >
                <Typography
                  variant="h6"
                  component="div"
                  sx={{ color: "hsl(356,100%,40%)" }}
                  gutterBottom
                >
                  {card.title}
                </Typography>
                <img
                  src={card.media}
                  alt={card.title}
                  width={"150px"}
                  height={"150px"}
                  sx={{ marginTop: "16px", marginBottom: "16px" }}
                />
                <Typography variant="body1" sx={{ color: "hsl(356,100%,40%)" }}>
                  {card.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Box>
      <Box>
        <Grid container sx={{ padding: "32px" }}>
          <Grid item xs={12} sm={6}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                padding: "32px",
              }}
            >
              <Typography variant="h3">
                About Quranic Verse with Timeline
              </Typography>
              <Typography variant="body1">Our background</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                padding: "32px",
              }}
            >
              <Typography variant="body1">
                At Quranic Verse with Timeline, we are passionate about sharing
                our work with the world. Knowing that we are creating for an
                audience gives each of our projects an additional boost.
                Although being so public is not always easy, we have found the
                feedback and comments we've received to be very helpful in
                shaping our work. We hope you'll enjoy browsing our latest
                projects; get in touch for feedback or possible collaborations.
              </Typography>
              <Link href="mailto:alialiayman@gmail.com?subject=Feedback for Quranic Verse with Timeline">
                Contact Us
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box
        sx={{
          overflowX: "auto",
          display: "flex",
          flexDirection: "row",
          gap: "16px",
          padding: "32px",
          backgroundColor: "#f5f5f5",
        }}
      >
        {projects.map((project, index) => (
          <Paper
            key={index}
            sx={{
              width: "300px",
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
            elevation={3}
          >
            <Typography variant="h6" component="div">
              {project.title}
            </Typography>
            <Typography variant="body1">{project.description}</Typography>
            <Button variant="contained" href={project.link}>
              View Project
            </Button>
          </Paper>
        ))}
      </Box>
      <Box
        sx={{
          backgroundColor: "#D0000E",
          color: "#FFC1C1",
          padding: "32px",
          marginTop: "25px",
        }}
      >
        <Grid container>
          <Grid item xs={12} sm={6}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              <Typography variant="h3">Quranic Verse with Timeline</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
              }}
            >
              <Typography variant="body1">949-522-1879</Typography>
              <Typography variant="body1">alialiayman@gmail.com</Typography>
              <Typography variant="body1">
                1024 Bayside Dr, Newport Beach, CA 92660
              </Typography>
              <Typography variant="body1">
                Stay informed, join our newsletter
              </Typography>
              <Typography variant="body1">Enter your email here</Typography>
              <TextField
                label="Email"
                sx={{ backgroundColor: "#fff" }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button
                variant="contained"
                sx={{ backgroundColor: "#FF6B6B", color: "#fff" }}
              >
                Submit
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Information;
