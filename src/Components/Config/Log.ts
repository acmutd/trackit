
import debug from 'debug';

const BASE = 'acm-trackit';

const COLORS: { [key: string]: string } = {
  trace: 'lightblue',
  info: 'white',
  warn: 'yellow',
  error: 'red'
}; 

class Log {
  generateMessage(level: string, message: any, source: string) {
    // Set the prefix which will cause debug to enable the message
    const namespace = `${BASE}:${level}`;
    const createDebug = debug(namespace);
    
    // Set the colour of the message based on the level
    createDebug.color = COLORS[level];
    
    if(source) { createDebug(source, message); }
    else { createDebug(message); }
  }
  
  trace(message: any, source: string) {
    return this.generateMessage('trace', message, source);
  }
  
  info(message: any, source: string) {
    return this.generateMessage('info', message, source);
  }
  
  warn(message: any, source: string) {
    return this.generateMessage('warn', message, source);
  }
  
  error(message: any, source: string) {
    return this.generateMessage('error', message, source);
  }
}

export default new Log();