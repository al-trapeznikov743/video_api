import {
  createVideoFieldsEnum,
  updateVideoFieldsEnum,
  CreateVideoInputDto,
  UpdateVideoInputDto
} from '../dto/video.input-dto';
import {ValidationError} from '../types/validationError';
import {Resolution} from '../types/video';

const bodyFieldsValidation = (
  existingKeys: Array<string>,
  body: object
): ValidationError[] => {
  const errors: ValidationError[] = [];

  Object.keys(body).forEach((key) => {
    if (!existingKeys.includes(key)) {
      errors.push({
        field: key,
        message: 'Additional fields are not allowed',
      });
    }
  });

  existingKeys.forEach((key) => {
    if (!(key in body)) {
      errors.push({
        field: key,
        message: `${key} is required`,
      });
    }
  });

  return errors;
};

const stringValidation = (
  field: string,
  val: string,
  min: number,
  max: number
): ValidationError | null => {
  if (
    !val ||
    typeof val !== 'string' ||
    val.trim().length < min ||
    val.trim().length > max
  ) {
    return {field, message: `Invalid ${field}`};
  }

  return null;
};

const booleanValidation = (
  field: string,
  val: boolean
): ValidationError | null => {
  if (typeof val !== 'boolean') {
    return {field, message: `Invalid ${field}: must be a boolean`};
  }

  return null;
};

const numberValidation = (
  field: string,
  val: number | null,
  min?: number,
  max?: number,
  isAllowNull?: boolean
): ValidationError | null => {
  if (isAllowNull && val === null) {
    return null;
  }

  if (typeof val !== 'number' || isNaN(val)) {
    return {field, message: `Invalid ${field}: must be a number`};
  }

  if (min && val < min) {
    return {field, message: `Invalid ${field}: must be at least ${min}`};
  }

  if (max && val > max) {
    return {field, message: `Invalid ${field}: must be at most ${max}`};
  }

  return null;
};

const dateValidation = (
  field: string,
  val: string,
  min?: string | Date,
  max?: string | Date
): ValidationError | null => {
  if (typeof val !== 'string' || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(val)) {
    return {field, message: `Invalid ${field}: must be a valid ISO date (YYYY-MM-DDTHH:mm:ss.sssZ)`};
  }

  const date = new Date(val);
  
  if (isNaN(date.getTime())) {
    return {field, message: `Invalid ${field}: must be a valid date`};
  }

  if (min && date < new Date(min)) {
    return {field, message: `Invalid ${field}: must be after ${new Date(min).toISOString()}`};
  }
  
  if (max && date > new Date(max)) {
    return {field, message: `Invalid ${field}: must be before ${new Date(max).toISOString()}`};
  }

  return null;
};

const availableResolutionsValidation = (
  availableResolutions: Resolution[]
): ValidationError[] => {
  const errors: ValidationError[] = [];

  if (!Array.isArray(availableResolutions)) {
    errors.push({
      field: 'availableResolutions',
      message: 'availableResolutions must be array',
    });
  } else if (!availableResolutions.length) {
    errors.push({
      field: 'availableResolutions',
      message: 'availableResolutions must not be empty',
    });
  } else {
    const existingResolutions = Object.values(Resolution);

    if (availableResolutions.length > existingResolutions.length) {
      errors.push({
        field: 'availableResolutions',
        message: 'Too many availableResolutions provided',
      });
    }

    availableResolutions.forEach((resolution) => {
      if (!existingResolutions.includes(resolution)) {
        const allowedValues = `Allowed values: ${existingResolutions.join(', ')}`;

        errors.push({
          field: 'availableResolutions',
          message: `Invalid resolution: ${resolution}. ${allowedValues}`
        })
      }
    });
  }

  return errors;
};

export const createVideoInputDtoValidation = (
  data: CreateVideoInputDto
): ValidationError[] => {
  const errors: ValidationError[] = [];

  const bodyErrors = bodyFieldsValidation(createVideoFieldsEnum, data);

  if (bodyErrors.length) {
    errors.push(...bodyErrors);

    return errors;
  }

  const {
    title,
    author,
    availableResolutions
  } = data;

  const titleError = stringValidation('title', title, 2, 40);
  const authorError = stringValidation('author', author, 2, 20);
  const availableResolutionsErrors = availableResolutionsValidation(availableResolutions);

  titleError && errors.push(titleError);
  authorError && errors.push(authorError);

  if (availableResolutionsErrors.length) {
    errors.push(...availableResolutionsErrors);
  }

  return errors;
};

export const updateVideoInputDtoValidation = (
  data: UpdateVideoInputDto
): ValidationError[] => {
  const errors: ValidationError[] = [];

  const {
    title,
    author,
    availableResolutions,
    canBeDownloaded,
    minAgeRestriction,
    publicationDate
  } = data;

  const bodyErrors = bodyFieldsValidation(updateVideoFieldsEnum, data);

  if (bodyErrors.length) {
    errors.push(...bodyErrors);

    return errors;
  }

  const titleError = stringValidation('title', title, 2, 40);
  const authorError = stringValidation('author', author, 2, 20);
  const canBeDownloadedError = booleanValidation('canBeDownloaded', canBeDownloaded);
  const minAgeRestrictionError = numberValidation('minAgeRestriction', minAgeRestriction, 1, 18, true);
  const publicationDateError = dateValidation('publicationDate', publicationDate);
  const availableResolutionsErrors = availableResolutionsValidation(availableResolutions);

  titleError && errors.push(titleError);
  authorError && errors.push(authorError);
  canBeDownloadedError && errors.push(canBeDownloadedError);
  minAgeRestrictionError && errors.push(minAgeRestrictionError);
  publicationDateError && errors.push(publicationDateError);

  if (availableResolutionsErrors.length) {
    errors.push(...availableResolutionsErrors);
  }

  return errors;
};