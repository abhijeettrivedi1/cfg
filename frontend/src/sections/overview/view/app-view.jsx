

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import AppCurrentVisits from '../app-current-visits';
import AppWebsiteVisits from '../app-website-visits';
import AppWidgetSummary from '../app-widget-summary';


// ----------------------------------------------------------------------

export default function AppView() {
  return (
    <Container maxWidth="xl">
      <Typography variant="h4" sx={{ mb: 5 }}>
        Total Students: 45
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Paragraph"
            total={14}
            color="success"
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Sentence"
            total={13}
            color="info"
            icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Words"
            total={15}
            color="warning"
          />
        </Grid>

        <Grid xs={12} sm={6} md={3}>
          <AppWidgetSummary
            title="Characters"
            total={8}
            color="error"
            icon={
              <img alt="icon" src="/assets/icons/glass/ic_glass_message.png" />
            }
          />
        </Grid>

        <Grid xs={12} md={4} lg={4}>
          <AppWebsiteVisits
            title="Proficiency of Students"
            chart={{
              labels: [
                'Paragraph',
                'Sentences',
                'Words',
                'Characters',
              ],
              series: [
                {
                  name: 'Marathi',
                  type: 'column',
                  fill: 'solid',
                  data: [23, 11, 22, 27],
                },
                {
                  name: 'Hindi',
                  type: 'area',
                  fill: 'gradient',
                  data: [44, 55, 41, 67],
                },
                {
                  name: 'English',
                  type: 'line',
                  fill: 'solid',
                  data: [30, 25, 36, 30],
                },
              ],
            }}
          />
        </Grid>
        <Grid xs={12} md={4} lg={4}>
          <AppCurrentVisits
            title="Class I"
            chart={{
              series: [
                { label: 'Paragraph', value: 4344 },
                { label: 'Sentence', value: 5435 },
                { label: 'Words', value: 1443 },
                { label: 'Characters', value: 4443 },
              ],
            }}
          />
        </Grid>
        <Grid xs={12} md={4} lg={4}>
          <AppCurrentVisits
            title="Class II"
            chart={{
              series: [
                { label: 'Paragraph', value: 4344 },
                { label: 'Sentence', value: 5435 },
                { label: 'Words', value: 1443 },
                { label: 'Characters', value: 4443 },
              ],
            }}
          />
        </Grid>
      </Grid>
    </Container>
  );
}