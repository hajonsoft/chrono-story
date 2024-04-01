import React from "react";

import ancient from "@/assets/ancient.webp";
import gate from "@/assets/gate.webp";
import hero from "@/assets/hero.webp";
import history from "@/assets/history.webp";
import {
  Box,
  Button,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

const Information = () => {
  return (
    <Container sx={{marginTop: '16px'}}>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          gap: "32px",
          padding: "32px",
        }}
      >
        <img
          src={hero}
          alt="ad"
          style={{
            width: "40%",
          }}
        />
        <Box>
          <Typography
            variant="h1"
            sx={{
              color: "#D0000E",
              marginTop: "64px",
              marginBottom: "64px",
              fontFamily: "Cormorant Garamond",
            }}
            align="left"
          >
            Time Verse: <br /> Analyzing Quranic Verses Chronologically
          </Typography>

          <Typography
            variant="h5"
            align="left"
            gutterBottom
            sx={{ color: "#D0000E", fontFamily: "Cormorant Garamond" }}
          >
            My World
          </Typography>

          <Typography
            align="left"
            variant="body1"
            sx={{ color: "#D0000E", fontFamily: "Cormorant Garamond" }}
          >
            Welcome to Time Verse, a specialized website that allows users to
            analyze and focus on Quranic verses by listing events
            chronologically and enabling note-taking with images and Quranic
            references. Primarily targeting researchers and academics, our
            website aims to include the Quran and facilitate chronological
            note-editing, inspired by exploring the connection between Quranic
            stories and ancient Egyptian history.
          </Typography>
          <Stack
            direction={"row"}
            alignItems={"center"}
            sx={{ marginTop: "16px" }}
          >
            <Button variant="contained">Get Started</Button>
          </Stack>
        </Box>
      </Box>
      <Box>
        <Grid container>
          <Grid item xs={12} sm={4}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                padding: "32px",
              }}
            >
              <img src={ancient} alt="ancient" />
              <Typography variant="h3">Our Mission</Typography>
              <Typography variant="body1">
                Our mission is to provide a platform for researchers and
                academics to analyze and focus on Quranic verses by listing
                events chronologically and enabling note-taking with images and
                Quranic references.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                padding: "32px",
              }}
            >
              <img src={gate} alt="gate" />
              <Typography variant="h3">Our Vision</Typography>
              <Typography variant="body1">
                Our vision is to include the Quran and facilitate chronological
                note-editing, inspired by exploring the connection between
                Quranic stories and ancient Egyptian history.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                padding: "32px",
              }}
            >
              <img src={history} alt="history" />
              <Typography variant="h3">Our Goal</Typography>
              <Typography variant="body1">
                Our goal is to provide a platform for researchers and academics
                to analyze and focus on Quranic verses by listing events
                chronologically and enabling note-taking with images and Quranic
                references.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box>
        <Grid container>
          <Grid item xs={12} sm={6}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                padding: "32px",
              }}
            >
              <Typography variant="h3">About Time Verse</Typography>
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
                At Time Verse, we are passionate about sharing our work with the
                world. Knowing that we are creating for an audience gives each
                of our projects an additional boost. Although being so public is
                not always easy, we have found the feedback and comments we've
                received to be very helpful in shaping our work. We hope you'll
                enjoy browsing our latest projects; get in touch for feedback or
                possible collaborations.
              </Typography>
              <Button variant="contained">Contact Us</Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Box>Gallery (list of projects)</Box>
      <Box>
        <Grid container>
          <Grid item xs={12} sm={6}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                padding: "32px",
              }}
            >
              <Typography variant="h3">Time Verse</Typography>
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
              <Typography variant="body1">123-456-7890</Typography>
              <Typography variant="body1">info@mysite.com</Typography>
              <Typography variant="body1">
                500 Terry Francine Street, 6th Floor, San Francisco, CA 94158
              </Typography>
              <Typography variant="body1">
                Stay informed, join our newsletter
              </Typography>
              <Typography variant="body1">Enter your email here</Typography>
              <TextField label="Email" />
              <Button variant="contained">Submit</Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Information;
