// export const API_BASE_URL = 'http://43.205.209.115:8000/'

// export const API_BASE_URL = 'http://3.111.147.36:8000'

// export const API_BASE_URL = 'http://127.0.0.1:8000'

 export const API_BASE_URL = 'http://localhost:8000'

export const AUTH_TOKEN = ''


export const downloadDocument = async (url) => {
    try {
      const filename = url.split('/').pop().split('?')[0] || 'myDocument.pdf';
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to download the file');
      const blob = await response.blob();
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading the document:', error);
    }
  };