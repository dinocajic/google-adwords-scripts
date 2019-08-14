/** 
 * Goes through each campaign and gathers data. Then emails the data to recipient.
 **/
function main() {
  var body = 'Good morning,\n\n';
  body    += 'Here is the report for Google AdWords. It contains a breakdown of each campaign and the cost of it all.\n\n';
  
  var campaignIterator = AdWordsApp.campaigns().get();
  
  while (campaignIterator.hasNext()) {
    var campaign      = campaignIterator.next();
    var stats         = campaign.getStatsFor('ALL_TIME');
    var weekly_stats  = campaign.getStatsFor('LAST_7_DAYS');
    var monthly_stats = campaign.getStatsFor('LAST_30_DAYS');
    
    body += 'Campaign Name: '           + campaign.getName()                             + '\n';
    body += '---------------------------------------\n';
    body += 'All-Time Stats\n';
    body += 'Clicks: '                  + numberWithCommas( stats.getClicks() )          + '\n';
    body += 'Impressions: '             + numberWithCommas( stats.getImpressions() )     + '\n';
    body += 'Average Cost Per Click: $' + stats.getAverageCpc().toFixed(2)               + '\n';
    body += 'Total Cost: $'             + numberWithCommas( stats.getCost().toFixed(2) ) + '\n';
    body += '\n';
    body += 'Last 7 Days\n';
    body += 'Clicks: '                  + numberWithCommas( weekly_stats.getClicks() )          + '\n';
    body += 'Impressions: '             + numberWithCommas( weekly_stats.getImpressions() )     + '\n';
    body += 'Average Cost Per Click: $' + weekly_stats.getAverageCpc().toFixed(2)               + '\n';
    body += 'Total Cost: $'             + numberWithCommas( weekly_stats.getCost().toFixed(2) ) + '\n';
    body += '\n';
    body += 'Last 30 Days\n';
    body += 'Clicks: '                  + numberWithCommas( monthly_stats.getClicks() )          + '\n';
    body += 'Impressions: '             + numberWithCommas( monthly_stats.getImpressions() )     + '\n';
    body += 'Average Cost Per Click: $' + monthly_stats.getAverageCpc().toFixed(2)               + '\n';
    body += 'Total Cost: $'             + numberWithCommas( monthly_stats.getCost().toFixed(2) ) + '\n';
    body += '\n';
  }
  
  body += 'Best Regards,\n\n';
  body += 'Dino Cajic\n';
  body += 'IT Director\n';
  body += 'Company Name\n';
  body += '800.555.5555: Toll\n';
  body += '555.555.5555: Cell\n';
  body += '555.555.5555: Fax\n';
  body += 'dino@email.com';
  
  var to      = "personOfInterest@email.com";
  var cc      = "secondPersonOfInterest@email.com";
  var replyTo = "me@email.com";
  var subject = "Updates: Google AdWords";
  
  MailApp.sendEmail(to + "," + cc, replyTo, subject, body);
  
  Logger.log(body);
}

/**
 * Formats the number so that it has commas: 
 * i.e. 4555444 will be 4,555,444
 */
function numberWithCommas(number) {
  var parts = number.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}
