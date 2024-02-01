"use client";
import React from "react";
import { Box, Rating, Tab, Tabs, Typography, styled } from "@mui/material";
import { Timestamp } from "firebase/firestore";
import useDetail from "@/lib/useDetail";
import Top from "./top";
import Map from "./map";
import RestaurantIcon from "@mui/icons-material/Restaurant";

interface Detail {
  id: string;
  name: string;
  rate: number;
  genre: string;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Detail = ({ docId }: { docId: string }) => {
  const { documents: detail } = useDetail("Shop", docId);

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box width="100%" mt={14} display="flex" justifyContent="center">
      {detail.map((detail: Detail) => (
        <Box
          width="90%"
          key={detail.id}
          display="flex"
          flexDirection="column"
          alignItems="left"
        >
          <Box pt={1.5} display="flex" alignItems="flex-end">
            <Typography
              fontFamily="游ゴシック"
              fontWeight="bold"
              fontSize="2.8rem"
            >
              {detail.name}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" pt={1} pb={1}>
            <Box display="flex" alignItems="center">
              <Rating
                name="half-rating-read"
                defaultValue={detail.rate}
                precision={0.1}
                readOnly
                size="large"
              />
              <Typography
                pl={1}
                fontFamily="游ゴシック"
                fontWeight="bold"
                fontSize="1.5rem"
              >
                {detail.rate}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" pl={4}>
              <RestaurantIcon fontSize="medium" />
              <Typography pl={1} fontFamily="游ゴシック" fontSize="1.2rem">
                {detail.genre}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="トップ" {...a11yProps(0)} />
                <Tab label="口コミ" {...a11yProps(1)} />
                <Tab label="地図" {...a11yProps(2)} />
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
              <Top docId={detail.id} />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              口コミ
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
              <Map docId={detail.id}/>
            </CustomTabPanel>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default Detail;
