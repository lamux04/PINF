#!/bin/bash
gunicorn -b localhost:8084 API:app