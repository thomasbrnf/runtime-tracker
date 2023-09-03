import { CreateEventDto } from './dto/create-event.dto';
import { OAuth2Client } from 'google-auth-library';
import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';

@Injectable()
export class CalendarService {
  oauth2Client: OAuth2Client;
  calendarId: string;

  constructor() {
    this.oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
    );
  }

  async userTimeZone(accessToken: string, refreshToken: string) {
    const calendar = await this.userCalendar(accessToken, refreshToken);
    this.calendarId = 'primary';

    const calendarData = await calendar.calendarList.get({
      calendarId: this.calendarId,
    });
    return calendarData.data.timeZone;
  }

  async addEvent(eventData: CreateEventDto) {
    const calendar = await this.userCalendar(
      eventData.accessToken,
      eventData.refreshToken,
    );

    const event = {
      summary: `${eventData.deviceName} up time`,
      description: 'Auto-generated via Runtime Tracker 🐈',
      start: {
        dateTime: eventData.startTime,
      },
      end: {
        dateTime: eventData.endTime,
      },
      colorId: '8',
    };

    this.calendarId = 'primary';
    await calendar.events.insert({
      calendarId: this.calendarId,
      requestBody: event,
    });
  }

  private async userCalendar(accessToken: string, refreshToken: string) {
    this.oauth2Client.setCredentials({
      access_token: accessToken,
      refresh_token: refreshToken,
    });

    return google.calendar({ version: 'v3', auth: this.oauth2Client });
  }
}
